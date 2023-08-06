import {useState} from 'react';
import Header from './components/Header';
import Chat from './components/Chat';

function App() {

  const [question, setQuestion] = useState("");
  const [content, setContent] = useState([]);
  const [load, setLoad] = useState(false);
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const CHAT_API_URL = 'https://api.openai.com/v1/chat/completions';

  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant."
    }, 
    {
      role: "system",
      content: "Only answer in 50 words or less."
    }, 
    {
      role: "user",
      content: question
    }
  ];


  const submit = () => {
    setLoad(true);
    const fetchData = async () => {
      const data = await fetch(CHAT_API_URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            messages: messages,
            model: 'gpt-3.5-turbo'
        })
      });

      // convert the data to json
      const response = await data.json();
      const { choices } = response;
      const { message } = choices.pop();
      const { role, content } = message;
    
      const answer = role === "assistant" ? content : null;

      const arr = [
        {
          'question' : question,
          'answer' : answer 
        }
      ];
      // set state with the result
      setContent(current => [...current, ...arr]);
      setLoad(false);
      setQuestion("");
    }
  
    // call the function
    fetchData()
      .catch(console.error);;
  }

  return (
    <div className="w-full lg:max-w-md mx-auto rounded-lg relative">
      <Header />
      <div className="h-screen bg-white relative overflow-y-scroll py-20">
        <div className="px-4 py-4">
          {
            content.map((data, index) => (
              <Chat data={data} key={`data-${index}`}/>
            ))

          }
          {
            load ? 
            <div>
              <Chat question={question} data={[]} />
              <h1 className={`text-black ${load ? 'block' : 'hidden'}`}>loading...</h1>
            </div>
            : ''
          }
        </div>
      </div>
      <div className="px-4 py-4 fixed bottom-0 w-full lg:max-w-md border-t flex items-center gap-2 bg-white">
        <input 
          type="text" 
          className="shrink w-full p-4 text-sm text-gray-900  rounded-lg" 
          placeholder="tanya apapun..." 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={submit} disabled={load && (question == '') ? true : false}>
          <img src="./assets/send-icon.svg" />
        </button>
      </div>
    </div>
  );
}

export default App;
