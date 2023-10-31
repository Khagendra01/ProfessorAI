namespace ProfessorAIAPI.Classes
{
    public class Response<T>
    {
        public string Message { get; set; }
        public T? Result { get; set; }
        public bool IsSuccess { get; set; }

        public Response() {
            Message = string.Empty;
            Result = default(T);
        }

        public Response(string Message, T Data, bool isSuccess)
        {
            this.Message = Message;
            this.Result = Data;
            this.IsSuccess = isSuccess;

        }
    }
}
