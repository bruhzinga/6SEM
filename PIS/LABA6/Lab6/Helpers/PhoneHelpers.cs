using System.Web.Mvc;
using PhoneDictionary;

namespace Lab6.Helpers
{
    public static class PhoneHelpers
    {
        public static MvcHtmlString CreateAddPhoneForm(this HtmlHelper html)
        {
            var form = new TagBuilder("form");
            form.MergeAttribute("method", "post");
            form.MergeAttribute("action", "/dict1/add");

            var nameInputWrapper = new TagBuilder("div");
            var nameInput = new TagBuilder("input");
            nameInput.MergeAttribute("type", "text");
            nameInput.MergeAttribute("name", "Name");
            nameInput.MergeAttribute("placeholder", "Name");
            nameInputWrapper.InnerHtml = nameInput.ToString();

            var phoneInputWrapper = new TagBuilder("div");
            var phoneInput = new TagBuilder("input");
            phoneInput.MergeAttribute("type", "text");
            phoneInput.MergeAttribute("name", "Number");
            phoneInput.MergeAttribute("placeholder", "Number");
            phoneInputWrapper.InnerHtml = phoneInput.ToString();

            var submitButtonWrapper = new TagBuilder("div");
            var submitButton = new TagBuilder("button");
            submitButton.MergeAttribute("type", "submit");
            submitButton.SetInnerText("Add");
            submitButtonWrapper.InnerHtml = submitButton.ToString();

            form.InnerHtml = nameInputWrapper.ToString() + phoneInputWrapper.ToString() + submitButtonWrapper.ToString();

            return new MvcHtmlString(form.ToString());
        }

        public static MvcHtmlString CreateAddPhoneForm2(this HtmlHelper html)
        {
            var form = new TagBuilder("form");
            form.MergeAttribute("method", "post");
            form.MergeAttribute("action", "/dict2/add");

            var nameInputWrapper = new TagBuilder("div");
            var nameInput = new TagBuilder("input");
            nameInput.MergeAttribute("type", "text");
            nameInput.MergeAttribute("name", "Name");
            nameInput.MergeAttribute("placeholder", "Name");
            nameInputWrapper.InnerHtml = nameInput.ToString();

            var phoneInputWrapper = new TagBuilder("div");
            var phoneInput = new TagBuilder("input");
            phoneInput.MergeAttribute("type", "text");
            phoneInput.MergeAttribute("name", "Number");
            phoneInput.MergeAttribute("placeholder", "Number");
            phoneInputWrapper.InnerHtml = phoneInput.ToString();

            var submitButtonWrapper = new TagBuilder("div");
            var submitButton = new TagBuilder("button");
            submitButton.MergeAttribute("type", "submit");
            submitButton.SetInnerText("Add");
            submitButtonWrapper.InnerHtml = submitButton.ToString();

            form.InnerHtml = nameInputWrapper.ToString() + phoneInputWrapper.ToString() + submitButtonWrapper.ToString();

            return new MvcHtmlString(form.ToString());
        }

        public static MvcHtmlString CreateUpdatePhoneForm(this HtmlHelper html, object newPhone)
        {
            var phone = newPhone as Phone;
            var form = new TagBuilder("form");
            form.MergeAttribute("method", "post");
            form.MergeAttribute("action", "/dict1/update");

            var idInput = new TagBuilder("input");
            idInput.MergeAttribute("type", "hidden");
            idInput.MergeAttribute("name", "Id");
            idInput.MergeAttribute("value", phone?.Id.ToString());


            var nameInputWrapper = new TagBuilder("div");
            var nameInput = new TagBuilder("input");
            nameInput.MergeAttribute("type", "text");
            nameInput.MergeAttribute("name", "Name");
            nameInput.MergeAttribute("value", phone?.Name);
            nameInput.MergeAttribute("placeholder", "Name");
            nameInputWrapper.InnerHtml = nameInput.ToString();

            var phoneInputWrapper = new TagBuilder("div");
            var phoneInput = new TagBuilder("input");
            phoneInput.MergeAttribute("type", "text");
            phoneInput.MergeAttribute("name", "Number");
            phoneInput.MergeAttribute("value", phone?.Number);
            phoneInput.MergeAttribute("placeholder", "Number");
            phoneInputWrapper.InnerHtml = phoneInput.ToString();

            var submitButtonWrapper = new TagBuilder("div");
            var submitButton = new TagBuilder("button");
            submitButton.MergeAttribute("type", "submit");
            submitButton.SetInnerText("Update");
            submitButtonWrapper.InnerHtml = submitButton.ToString();

            form.InnerHtml = idInput.ToString() + nameInputWrapper.ToString() + phoneInputWrapper.ToString() + submitButtonWrapper.ToString();

            return new MvcHtmlString(form.ToString());
        }

        public static MvcHtmlString CreateUpdatePhoneForm2(this HtmlHelper html, object newPhone)
        {
            var phone = newPhone as Phone;
            var form = new TagBuilder("form");
            form.MergeAttribute("method", "post");
            form.MergeAttribute("action", "/dict2/update");

            var idInput = new TagBuilder("input");
            idInput.MergeAttribute("type", "hidden");
            idInput.MergeAttribute("name", "Id");
            idInput.MergeAttribute("value", phone?.Id.ToString());


            var nameInputWrapper = new TagBuilder("div");
            var nameInput = new TagBuilder("input");
            nameInput.MergeAttribute("type", "text");
            nameInput.MergeAttribute("name", "Name");
            nameInput.MergeAttribute("value", phone?.Name);
            nameInput.MergeAttribute("placeholder", "Name");
            nameInputWrapper.InnerHtml = nameInput.ToString();

            var phoneInputWrapper = new TagBuilder("div");
            var phoneInput = new TagBuilder("input");
            phoneInput.MergeAttribute("type", "text");
            phoneInput.MergeAttribute("name", "Number");
            phoneInput.MergeAttribute("value", phone?.Number);
            phoneInput.MergeAttribute("placeholder", "Number");
            phoneInputWrapper.InnerHtml = phoneInput.ToString();

            var submitButtonWrapper = new TagBuilder("div");
            var submitButton = new TagBuilder("button");
            submitButton.MergeAttribute("type", "submit");
            submitButton.SetInnerText("Update");
            submitButtonWrapper.InnerHtml = submitButton.ToString();

            form.InnerHtml = idInput.ToString() + nameInputWrapper.ToString() + phoneInputWrapper.ToString() + submitButtonWrapper.ToString();

            return new MvcHtmlString(form.ToString());
        }
    }
}