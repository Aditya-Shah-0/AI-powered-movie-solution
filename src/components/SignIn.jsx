import React from 'react'

const SignIn = () => {
    return (
        <div>
            <div class="container">
                <div class="box1">
                    <div class="maincontext">
                        <img src="/image/White Logo.png" alt="One Stop Movie" width="100px" />
                        <div class="welcome">Welcome!</div>
                        <div class="welcomecontext">Get review of desire Movies, TV Series.</div>
                    </div>
                    <div class="maininput">
                        <div class="sigin1">Sign Up Here!</div>
                        <div class="input1">
                            <input type="email" id="email" placeholder="- E-mail" />
                            <input type="password" name="password" id="password" placeholder="- Password" />
                            <input type="text" name="fName" id="fName" placeholder="- First Name" />
                            <input type="text" name="lName" id="lName" placeholder="- Last Name" />
                        </div>
                        <div class="button1">
                            <button id="submit">Sign Up</button>
                            <a href="HTML-login1.html"><button>Login</button></a>
                        </div>
                    </div>
                </div>
                <div class="box2"></div>
                <div class="box3"></div>
            </div>
        </div>
    )
}

export default SignIn
