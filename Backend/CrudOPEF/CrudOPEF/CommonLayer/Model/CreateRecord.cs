using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crud_Operations.CommonLayer.Model
{
    public class CreateRecordRequest
    {
        public string Username { get; set; }
        public int Age { get; set; }
    }

    public class CreateRecordResponse
    {
        public bool isSuccess { get; set; }
        public string Message { get; set; }
    }
}
