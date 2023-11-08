import React, { useEffect, useRef, useState } from 'react';

const Testfile = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [apiResult, setApiResult] = useState([]);

  const inputOne = useRef();
  const inputTwo = useRef(0);
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current = renderCounter.current + 1;
    inputTwo.current = text2;
  }, [text1, text2]);

  const handleSubmit = () => {
    setResult(<p>{`${text1} is ${text2} years old`}</p>);
    console.log(inputOne.current);
    inputOne.current.focus();
    return;
  };
  const handleAPI = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiResult(data);
      });
  };
  return (
    <div style={{ margin: 'auto', width: '50vw' }}>
      <h1>
        Welcome to DEMO app. Used this React app for Hosting in AWS EC2
        instance.
      </h1>
      <input
        ref={inputOne}
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
      <p>Rendering {renderCounter.current} time</p>
      <p>
        The current value is {text2}, but the previous value is
        {inputTwo.current}
      </p>
    </div>
  );
};

export default Testfile;
