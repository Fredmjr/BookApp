var o=document.getElementById(".alluserBtn");console.log(o);fetch("/user/allusers",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}}).then(e=>e.json()).then(e=>{let t=document.createElement("div");t.innerHTML=`
      <div>
      ${e.email}
    </div>
      
      `;let n=document.querySelector("main");n.innerHTML=t.innerHTML,console.log(e)});var l=10,r=[...document.querySelectorAll(".allbk-book-card")];function s(e=l){r.forEach((t,n)=>t.style.display=n<e?"flex":"none")}s();
//# sourceMappingURL=admindashboard.js.map
