using Crud_Operations.CommonLayer.Model;
using CrudOPEF.ModelController;
using CrudOPEF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudOPEF.DataLayer
{
    public class CrudOpDL:ICrudOpDL
    {
        private readonly CrudOpDbContext _dbContext;
        private readonly ILogger<CrudOpDL> _logger;

        public CrudOpDL(CrudOpDbContext dbContext, ILogger<CrudOpDL> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<CreateRecordResponse> CreateRecord(CreateRecordRequest request)
        {
            CreateRecordResponse response = new CreateRecordResponse();
            response.isSuccess = true;
            response.Message = "Successful";
            try
            {
                var entry = new CrudOp();
                entry.UserName = request.Username;
                entry.Age = request.Age;
                
                await _dbContext.CrudOps.AddAsync(entry);
                await _dbContext.SaveChangesAsync();
                

            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.Message = ex.Message;
                _logger.LogError("Exception occured at :", ex.ToString());
            }
            
            return response;
        }

        public async Task<DeleteRecordResponse> DeleteRecord(DeleteRecordRequest request)
        {
            DeleteRecordResponse response = new DeleteRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful!";
            try
            {
                var entry = await _dbContext.CrudOps.FindAsync(request.Id);
                if (entry != null)
                {
                    _dbContext.CrudOps.Remove(entry);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                _logger.LogError("Exception occured at :", ex.ToString());
            }
            
            return response;
        }

        public async Task<ReadRecordResponse> ReadRecord()
        {
            ReadRecordResponse response = new ReadRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {
                response.readRecordData = await _dbContext.CrudOps.ToListAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                _logger.LogError("Exception occured at :", ex.ToString());
            }

            return response;
        }

        public async Task<UpdateRecordResponse> UpdateRecord(UpdateRecordRequest request)
        {
            UpdateRecordResponse response = new UpdateRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful!";
            try
            {
                var entry = await _dbContext.CrudOps.FindAsync(request.Id);
                if(entry != null)
                {
                    entry.UserName = request.Username;
                    entry.Age = request.Age;
                    await _dbContext.SaveChangesAsync();
                }
                
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                _logger.LogError("Exception occured at :", ex.ToString());
            }
            
            return response;
        }
    }
}
