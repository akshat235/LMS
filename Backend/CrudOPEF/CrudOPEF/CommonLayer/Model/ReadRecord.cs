using CrudOPEF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crud_Operations.CommonLayer.Model
{
    public class ReadRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<CrudOp> readRecordData { get; set; }
    }
    public class ReadRecordData
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }

    }
}
