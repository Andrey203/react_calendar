import React, { Component } from 'react';
import { connect } from 'react-redux';
import UUID from "node-uuid";
import Show from './Show';

class Event extends Component {

    startY;
    endY;

    mouseDown = e => {
        if (e.target.tagName === "BUTTON" ) return;
        this.startY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    };

    mouseUp = e => {
        if (e.target.tagName === "BUTTON" ) return;
        this.endY = e.clientY - e.currentTarget.getBoundingClientRect().top;
        let marginLeft = "0";
        let width = "197px";
        let id = 0;
        let counter = 0;
        this.props.events.map(elem => {
            if ( (this.startY >= elem.startY && this.startY <= elem.endY) ||
                (this.endY >= elem.startY && this.endY <= elem.endY)) {
                counter += 1;
                id = elem.id;
            }
        });

        if (counter === 2) {
            alert("Please, choose another time!");
            return;
        }

        if (counter === 1) {
            width = "97px";
            let prevEvent = this.props.events.find(obj => obj.id === id);
            if (prevEvent.marginLeft === "0") marginLeft = "100px";

            this.props.dispatch({
                type: "CHANGE_EVENT",
                id: id
            });
        }
        let text = prompt("Enter your event") || "";
        let sliced = "";
        if (width === "197px") {
            sliced = text.slice(0, 22);
            if (sliced.length < text.length) sliced += "...";
        } else {
            sliced = text.slice(0, 8);
            if (sliced.length < text.length) sliced += "...";
        }

        let data = {
            id: UUID.v4(),
            width: width,
            startY: this.startY,
            endY: this.endY,
            duration: this.endY - this.startY,
            marginLeft: marginLeft,
            title: sliced
        };

        this.props.dispatch({
            type: "ADD_EVENT",
            data
        })

    };

    render() {

        return (
            <div className="eventField" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                {this.props.events.map(event => (
                    <Show key={event.id} event={event} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state
    }
};
export default connect(mapStateToProps)(Event);

