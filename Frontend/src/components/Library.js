import './Library.scss';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import bg from "../assets/libraryunsplash.jpg";
import { Link } from 'react-router-dom';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import LibraryServices from '../Services/LibraryServices';
import EditSharpIcon from '@material-ui/icons/EditSharp';

const service = new LibraryServices();
export default class Library extends Component {
  constructor() {
    super();
    this.state = {
      //   UserId: '',
      Isbn: '',
      Title: '',
      Days: '',
      Author: '',
      PId: '',
      DataRecord: [],
      UpdateFlag: false
    }
  }
  componentWillMount() {
    console.log("This is an will mount message");
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
    if (this.state.Isbn === '' || this.state.Author === '') {
      console.log("Input field is empty");
      return;
    }
    console.log("Data:", this.state);

    if (this.state.UpdateFlag === false) {

      const data = {
        isbn: this.state.Isbn,
        title: this.state.Title,
        autorName: this.state.Author,
        days: Number(this.state.Days),
        pId: Number(this.state.PId)
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
        isbn: this.state.Isbn,
        title: this.state.Title,
        autorName: this.state.Author,
        days: Number(this.state.Days),
        pId: Number(this.state.PId)
      }
      service.UpdateRecord(data).then((data) => {
        console.log(data)
        this.setState({ UpdateFlag: false });
        this.ReadRecord();


      }).catch((error) => { console.log(error) });

    }
  }

  handleEdit = (data) => {
    this.setState({ Isbn: data.isbn, Title: data.title, Author: data.autorName, Days: data.days, PId: data.pId, UpdateFlag: true })
  }

  handleDelete = (datas) => {

    console.log('handle Delete call!@!2!212 ', datas.isbn)
    const data = {
      isbn: datas.isbn
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
      <div className='Main-ContainerL' style={{
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
        <div className='MainContainerL'>
          <div className='SubContainerL'>
            <div className='Box1L'>
              <div className='Input-ContainerL'>
                <div className='flex-ContainerL'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="ISBN"
                    name="Isbn"
                    size="small"
                    variant='outlined'
                    value={state.Isbn}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-ContainerL'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Title"
                    name="Title"
                    size="small"
                    variant='outlined'
                    value={state.Title}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-ContainerL'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Author"
                    name="Author"
                    size="small"
                    variant='outlined'
                    value={state.Author}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-ContainerL'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Days"
                    name="Days"
                    size="small"
                    variant='outlined'
                    value={state.Days}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-ContainerL'>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="PId"
                    name="PId"
                    size="small"
                    variant='outlined'
                    value={state.PId}
                    onChange={this.handleChange} />
                </div>
                <div className='flex-buttonL'>
                  <button className="submit-btnL" onClick={this.handleClick} >Submit</button>
                </div>
              </div>
            </div>
            <div className='Box2L'>
              {
                Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0 ?
                  this.state.DataRecord.map(function (data, index) {
                    return (
                      <div key={index} className='data-flexL'>
                        <div className="UserIdL">{index + 1}</div>
                        <div className="UserIdL">{data.isbn}</div>
                        <div className="UserNameL">{data.title}</div>
                        <div className="UserNameL">{data.autorName}</div>
                        <div className="AgeL">{data.days}</div>
                        <div className="AgeL">{data.pId}</div>
                        <div className='UpdateL'>
                          {/* <Button variant="outlined" color="primary" onClick={Self.handleEdit(data)}>Edit</Button> */}
                          <Button  color="primary" onClick={() => Self.handleEdit(data)}><EditSharpIcon style={{ color: 'teal'}}/> </Button>
                        </div>
                        <div className='DeleteL'>
                          {/* onClick={() => this.handleButtonChange(false)}  */}
                          {/* <Button variant="outlined" color="secondary" onClick={Self.handleDelete(data)}>Delete</Button> */}
                          <Button color="secondary" onClick={() => Self.handleDelete(data)}><DeleteForeverOutlinedIcon style={{ color: 'teal'}}/></Button>
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
