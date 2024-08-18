const configuration = {
    iceServers: [
      { urls: 'stun:stun.example.org' },
      {urls : 'stun:stun1.l.google.com'} ,
      {urls : 'stun:stun2.l.google.com'} ,
      {
        urls: 'turn:turn.example.org',
        username: 'yourUsername',
        credential: 'yourPassword'
      }
    ]
  };

export default configuration;