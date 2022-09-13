using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CrudOPEF.Models
{
    public class CrudOp
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        
        [Required]
        [StringLength(25)]
        public string UserName { get; set; }
        [Required]
        public int Age { get; set; }
    }
}
