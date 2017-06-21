using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileUploader.Web.Controllers
{
    public class UploaderController : Controller
    {
        [Route("uploader/justfile")]
        public dynamic UploadJustFile(IFormCollection form)
        {
            try
            {
                foreach (var file in form.Files)
                {
                    UploadFile(file);
                }

                return new { Success = true };
            }
            catch (Exception ex)
            {
                return new { Success = false, ex.Message };
            }
        }

        [Route("uploader/upload")]
        public dynamic Upload(IFormCollection form)
        {
            try
            {
                Person person = MapFormCollectionToPerson(form);

                foreach (var file in form.Files)
                {
                    UploadFile(file);
                }

                return new { Success = true };
            }
            catch (Exception ex)
            {
                return new { Success = false, ex.Message };
            }
        }

        private static Person MapFormCollectionToPerson(IFormCollection form)
        {
            var person = new Person();

            string firstNameKey = "firstName";
            string lastNameKey = "lastName";
            string phoneNumberKey = "phoneNumber";

            if (form.Any())
            {
                if (form.Keys.Contains(firstNameKey))
                    person.FirstName = form[firstNameKey];

                if (form.Keys.Contains(lastNameKey))
                    person.LastName = form[lastNameKey];

                if (form.Keys.Contains(phoneNumberKey))
                    person.PhoneNumber = form[phoneNumberKey];
            }

            return person;
        }

        private static void UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");

            byte[] fileArray;
            using (var stream = file.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                fileArray = memoryStream.ToArray();
            }

            //TODO: You can do it what you want with you file, I just skip this step
        }
    }
}