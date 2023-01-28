import SignUpComponentStyle from './SignUpComponentStyle';

const SignupComponent = () => {
    return (
        <SignUpComponentStyle>
            <h1>Sign Up</h1>
            <form className="signUp-form">
                <label className="signUp-form_label">Email Adress</label>
                <input
                    className="signUp-form_input"
                    type="email"
                    placeholder="Enter email adress"
                    value={'email'}
                />

                <label className="signUp-form_label">Password</label>
                <input
                    className="signUp-form_input"
                    type="password"
                    placeholder="Enter  password"
                    value={'password'}
                />

                <button className="signUp-form_button" type="submit">
                    Sign up
                </button>
                <div className="signUp-form_text">
                    <span>Do you have an account? </span>
                </div>
            </form>
        </SignUpComponentStyle>
    );
};

export default SignupComponent;
