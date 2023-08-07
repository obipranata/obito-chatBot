import {useState} from 'react';
import Header from './components/Header';
import Chat from './components/Chat';

function App() {

  const [question, setQuestion] = useState("");
  const [content, setContent] = useState([]);
  const [load, setLoad] = useState(false);
  const CHAT_API_URL = 'https://be-chat-bot.vercel.app/';



  const submit = () => {
    setLoad(true);
    const fetchData = async () => {
      const data = await fetch(CHAT_API_URL+'?question='+question,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // convert the data to json
      const response = await data.json();

      const arr = [
        {
          'question' : question,
          'answer' : response 
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
        <button className={`${load ? 'cursor-wait' : 'cursor-pointer'}`} onClick={submit} disabled={load && (question == '') ? true : false}>
          <img src="https://obipranata.github.io/obito-chatBot/assets/send-icon.svg" />
        </button>
      </div>
    </div>
  );
}

export default App;
