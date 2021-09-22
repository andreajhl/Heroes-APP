export async function login(email,password){
    let loginUser= await fetch(`https://challenge-react.alkemy.org/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({email,password}),
      });
      loginUser = await loginUser.json();

      if(loginUser.error) return{ ok:true,msg:loginUser.error};

      return loginUser.token
}