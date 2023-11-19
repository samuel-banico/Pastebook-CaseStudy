using pastebook_db.Data;
using pastebook_db.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pastebook_api_test
{
    public class SendEmail
    {
        [Fact]
        public void Test_SendingEmail() 
        {
            // Arrange
            var userRepo = new UserRepository(new PastebookContext());

            //Act
            var result = userRepo.SendEmail("banico.sgl@gmail.com", "test");

            //Assert
            Assert.True(result);
        }
    }
}
