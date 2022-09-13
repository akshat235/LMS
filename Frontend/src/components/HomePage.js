import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './HomePage.scss';
import bg from "../assets/libraryunsplash.jpg";
import CrudServices from '../Services/CrudServices';
import { Link } from 'react-router-dom';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';

const service = new CrudServices();

export default class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      UserId: '',
      UserName: '',
      Age: '',
      DataRecord: [],
      UpdateFlag: false
    }
  }

  componentWillMount() {
    console.log("This is an willmount message");
    this.ReadRecord();
  }

  ReadRecord() {
    service.ReadRecord().then((data) => {
      console.log(data)
      console.log(data.data.readRecordData)
      this.setState({ DataRecord: data.data.readRecordData })
    }).catch((error) => {
      console.log(error)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state)
    })
  }

  handleClick = () => {
    if (this.state.UserName === '' || this.state.Age === '') {
      console.log("Input field is empty");
      return;
    }
    console.log("Data:", this.state);

    if (this.state.UpdateFlag === false) {

      const data = {
        username: this.state.UserName,
        age: Number(this.state.Age),
      }

      service.CreateRecord(data).then((data) => {
        console.log(data)
        this.ReadRecord();
      }).catch((error) => {
        console.log(error)
      });
    }
    else {
      const data = {
        id: this.state.UserId,
        username: this.state.UserName,
        age: Number(this.state.Age)
      }
      service.UpdateRecord(data).then((data) => {
        console.log(data)
        this.ReadRecord();
        this.setState({ UpdateFlag: false })

      }).catch((error) => { console.log(error) });

    }
  }

  handleEdit = (data) => {
    this.setState({ UserName: data.userName, Age: data.age, UserId: data.id, UpdateFlag: true })
  }

  handleDelete = (datas) => {

    console.log('handle Delete call!@!2!212 ', datas.id)
    const data = {
      id: Number(datas.id)
    }
    service.DeleteRecord(data).then((data) => {
      console.log(data)
      this.ReadRecord();
    }).catch((error) => {
      console.log(error)
    });
  }



  render() {

    let state = this.state;
    let Self = this;

    return (
      <div className='Main-Container' style={{
        backgroundImage: `url(${bg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className='headermain'>
          <div className='maintitle'>
            <h1> Book Byte </h1>
          </div>
          <div id='logout' className='textlink1'><Link to="/" style={{ textDecoration: 'none' }}>
            <ExitToAppTwoToneIcon style={{ color: 'white' }}></ExitToAppTwoToneIcon> </Link> </div>
          <div className='textlink1'>
            <Link to="/homepage" style={{ textDecoration: 'none' }}><h2 className='linktext'>Users   </h2></Link>
          </div>
          <div className='textlink2'>
            <Link to="/library" style={{ textDecoration: 'none' }}>   <h2 className='linktext'>Booklog</h2></Link>
          </div>
        </div>
        <div className='MainContainer'>
          <div className='SubContainer'>
            <div className='Box1'>
              <div className='Input-Container'>
                <div className='flex-Container'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    name="UserName"
                    size="small"
                    variant='outlined'
                    value={state.UserName}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-Container'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Membership ID"
                    name="Age"
                    size="small"
                    variant='outlined'
                    value={state.Age}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-button'>
                  <button className="submit-btn" onClick={this.handleClick} >Submit</button>
                </div>
              </div>

            </div>
            <div className='Box2'>
              {
                Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0 ?

                  this.state.DataRecord.map(function (data, index) {
                    return (
                      <div key={index} className='data-flex'>
                        <div className="UserId">{index + 1}</div>
                        <div className="UserName">{data.userName}</div>
                        <div className="Age">{data.age}</div>
                        <div className='Update'>
                          {/* <Button variant="outlined" color="primary" onClick={Self.handleEdit(data)}>Edit</Button> */}
                          <Button color="primary" onClick={() => Self.handleEdit(data)}><EditSharpIcon style={{ color: 'teal' }} /></Button>
                        </div>
                        <div className='Delete'>
                          {/* onClick={() => this.handleButtonChange(false)}  */}
                          {/* <Button variant="outlined" color="secondary" onClick={Self.handleDelete(data)}>Delete</Button> */}
                          <Button color="secondary" onClick={() => Self.handleDelete(data)}>
                            <DeleteForeverOutlined style={{ color: 'teal' }} />
                          </Button>
                        </div>
                      </div>

                    )
                  }) : <div></div>
              }

            </div>
          </div>

        </div>
      </div>
    )


  }
}
