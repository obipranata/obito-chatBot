const Chat = ({data, question}) => {
  return (
    <>
    <div className="flex items-center gap-5 justify-end mt-5">
      <div className="text-[#282828] bg-[#E3E3E3] py-1 rounded-lg px-4">
        <p>{data.question ?? question}</p>
      </div>
    </div>
    {
      data ?
      <div className="flex items-center gap-5 mt-5">
        <div className="max-w-11.5 shrink-0">
          <img src="https://obipranata.github.io/obito-chatBot/assets/obito.jpg" className="w-11 rounded-full" />
        </div>
        <div className="text-[#282828] bg-[#E3E3E3] py-1 rounded-lg px-4">
          <p>{data.answer}</p>
        </div>
      </div>
      : ''
    }
    </>
  );
}

export default Chat;