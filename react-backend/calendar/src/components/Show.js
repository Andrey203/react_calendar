import React, { Component } from 'react';
import { connect } from 'react-redux';

class Show extends Component {

    mouseClick = e => {
        this.props.dispatch({
            type: "REMOVE_EVENT",
            id: e.target.id
        });
    };

    render() {
        return (
            <div className="event"  style={{
                position: "absolute",
                width: this.props.event.width,
                top: this.props.event.startY,
                height: this.props.event.duration,
                marginLeft: this.props.event.marginLeft
            }}>
                <div>
                    {this.props.event.title}
                    <button className="close" id={this.props.event.id} onClick={this.mouseClick}>
                        x
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state
    }
};

export default connect(mapStateToProps)(Show);