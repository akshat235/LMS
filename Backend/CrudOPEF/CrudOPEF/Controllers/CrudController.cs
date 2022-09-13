using Crud_Operations.CommonLayer.Model;
using CrudOPEF.DataLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudOPEF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    
    public class CrudController : Controller
    {
        public readonly ICrudOpDL _crudOpDL;
        

        public CrudController(ICrudOpDL crudOpDL)
        {
            _crudOpDL = crudOpDL;
        }

        [HttpPost]
        [Route("CreateRecord")]
        public async Task<IActionResult> CreateRecord(CreateRecordRequest request)
        {
            CreateRecordResponse response = null;
            try
            {
                response = await _crudOpDL.CreateRecord(request);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }
        
        
        [HttpGet]
        [Route("ReadRecords")]
        public async Task<IActionResult> ReadRecords()
        {
            ReadRecordResponse response = null;
            try
            {
                response = await _crudOpDL.ReadRecord();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }


        [HttpPut]
        [Route("UpdateRecords")]
        public async Task<IActionResult> UpdateRecords(UpdateRecordRequest request)
        {
            UpdateRecordResponse response = null;
            try
            {
                response = await _crudOpDL.UpdateRecord(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteRecords")]
        public async Task<IActionResult> DeleteRecords(DeleteRecordRequest request)
        {
            DeleteRecordResponse response = null;
            try
            {
                response = await _crudOpDL.DeleteRecord(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }
    }
}
