import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleEmailChangeReg = this.handleEmailChangeReg.bind(this);
        this.handleNameChangeReg = this.handleNameChangeReg.bind(this);
        this.handlePassChangeReg = this.handlePassChangeReg.bind(this);

        this.handleNameChangeLog = this.handleNameChangeLog.bind(this);
        this.handlePassChangeLog = this.handlePassChangeLog.bind(this);
    }

    state = {
        users: [],
        user: "Guest",
        userPassword: "",
        userEvents: [],
        fullUserEvents: []
    };

    handleEmailChangeReg = e => {
        this.setState({email: e.target.value});
    };

    handleNameChangeReg = e => {
        this.setState({nameReg: e.target.value});
    };

    handlePassChangeReg = e => {
        this.setState({passwordReg: e.target.value});
    };

    handleSubmitReg = (event) => {
        event.preventDefault();

        this.setState({user: this.state.nameReg});
        this.setState({userPassword: this.state.passwordReg});

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json" },
            body: JSON.stringify({
                username: this.state.nameReg,
                email: this.state.email,
                password: this.state.passwordReg,
                userEvents: [],
                fullUserEvents: []
            })
        };
        fetch("http://localhost:3000/signup", options)
            .then(res => res.json())
            .then(users => this.setState({ users }))
            .catch((err) => {
                console.error('Request failed', err)
            });
    };

    handleNameChangeLog = e => {
        this.setState({nameLog: e.target.value});
    };

    handlePassChangeLog = e => {
        this.setState({passwordLog: e.target.value});
    };

    handleSubmitLog = (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json" },
            body: JSON.stringify({
                username: this.state.nameLog,
                password: this.state.passwordLog
            })
        };
            fetch("http://localhost:3000/login", options)
                .then(res => res.json())
                .then(user => {
                    this.setState({user: user.username});
                    this.setState({password: user.password});
                    this.setState({userEvents: user.userEvents});
                    this.setState({fullUserEvents: user.fullUserEvents});
                        user.fullUserEvents.map(data => {
                            this.props.dispatch({
                                type: "ADD_EVENT",
                                data
                            })
                        });

                })
                .catch((err) => {
                    console.error('Request failed', err)
                });
    };

    saveEvents = () => {
        let arr = [];
        this.props.events.map(event => {
            arr.push({
                start: event.startY,
                duration: event.duration,
                title: event.title
            });
        });

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json" },
            body: JSON.stringify({
                username: this.state.nameLog,
                password: this.state.passwordLog,
                userEvents: arr,
                fullUserEvents: this.props.events
            })
        };
        fetch("http://localhost:3000/update", options)
            .then(res => res.json())
            .then(users => this.setState({ users }))
            .catch((err) => {
                console.error('Request failed', err)
            });
    };

    logout = () => {
        this.setState({
            users: [],
            user: "Guest",
            userPassword: "",
            userEvents: [],
            fullUserEvents: []
        });
        this.props.events.map(el => {
            this.props.dispatch({
                type: "REMOVE_EVENT",
                id: el.id
            });
        });
    };

    loadEvents = () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json" },
            body: JSON.stringify({
                username: this.state.nameLog,
                password: this.state.passwordLog
            })
        };
        fetch("http://localhost:3000/download", options)
            .then(res => res)
            .catch((err) => {
                console.error('Request failed', err)
            });
    };

    render() {
        return (
            <div className="userField">
                <h2>User: {this.state.user}</h2>

                <div className="formContainer">

                <h3>Registration</h3>

                <form method="post" onSubmit={this.handleSubmitReg}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" onChange={this.handleNameChangeReg} required/>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChangeReg} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={this.handlePassChangeReg} required/>
                    </div>
                    <button className="formButton" type="submit">Send</button>
                </form>
                </div>

                <div className="formContainer">
                <h3>Login</h3>

                <form method="post" onSubmit={this.handleSubmitLog}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" onChange={this.handleNameChangeLog} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={this.handlePassChangeLog} required/>
                    </div>
                    <button className="formButton" type="submit">Send</button>
                </form>
                </div>

                <button className="formButton" onClick={this.logout}>Logout</button>
                <button className="formButton" onClick={this.saveEvents}>Save {this.state.user}'s events</button>
                <button className="formButton" onClick={this.loadEvents}>Load your events</button>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state
    }
};

export default connect(mapStateToProps)(Form);