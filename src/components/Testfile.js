import React, { useState } from 'react';

const Testfile = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [apiResult, setApiResult] = useState([]);

  const handleSubmit = () => {
    setResult(<p>{`${text1} is ${text2} years old`}</p>);
    return;
  };
  const handleAPI = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiResult(data);
      });
  };
  return (
    <div>
      <input
        type='text'
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        placeholder='Your name..'
      />
      <input
        type='text'
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        placeholder='age'
      />
      <button onClick={handleSubmit}>Submit</button>
      {result}
      <button onClick={handleAPI}>Get API result</button>
    </div>
  );
};

export default Testfile;
