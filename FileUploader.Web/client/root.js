import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


class FileUploader extends Component {
    constructor(props) {
        super(props);

        this.uploadJustFile = this.uploadJustFile.bind(this);
        this.uploadForm = this.uploadForm.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);

        this.state = {
            justFileServiceResponse: 'Click to upload!',
            formServiceResponse: 'Click to upload the form!',
            fields: {}
        }
    }

    uploadJustFile(e) {
        e.preventDefault();
        let state = this.state;
        state.justFileServiceResponse = 'Please wait...';
        this.setState(state);


        if (!state.hasOwnProperty('files')) {
            state.justFileServiceResponse = 'First select a file!';
            this.setState(state);
            return;
        }

        let form = new FormData();

        for (var index = 0; index < state.files.length; index++) {
            var element = state.files[index];
            form.append('file', element);
        }

        axios.post('uploader/justfile', form)
            .then((result) => {
                let message = "Success!"
                if (!result.data.success) {
                    message = result.data.message;
                }
                state.justFileServiceResponse = message;
                this.setState(state);
            })
            .catch((ex) => {
                console.error(ex);
            });
    }

    uploadForm(e) {
        e.preventDefault();
        let state = this.state;
        state.formServiceResponse = 'Please wait...';
        this.setState(state);

        if (!state.hasOwnProperty('files')) {
            state.formServiceResponse = 'First select a file!';
            this.setState(state);
            return;
        }

        let form = new FormData();
        for (var index = 0; index < state.files.length; index++) {
            var element = state.files[index];
            form.append('file', element);
        }

        for (var key in state.fields) {
            if (state.fields.hasOwnProperty(key)) {
                var element = state.fields[key];
                form.append(key, element);
            }
        }

        axios.post('uploader/upload', form)
            .then((result) => {
                let message = "Success!"
                if (!result.data.success) {
                    message = result.data.message;
                }
                state.formServiceResponse = message;
                this.setState(state);
            })
            .catch((ex) => {
                console.error(ex);
            });
    }

    filesOnChange(sender) {
        let files = sender.target.files;
        let state = this.state;
        state['files'] = files;
        this.setState(state);
    }

    fieldOnChange(sender) {
        let fieldName = sender.target.name;
        let value = sender.target.value;

        let state = this.state;
        state.fields[fieldName] = value;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <form>
                    <h2>Just file</h2>
                    <p><b>{this.state.justFileServiceResponse}</b></p>
                    <input type="file" id="case-one" onChange={this.filesOnChange} />
                    <br />
                    <button type="text" onClick={this.uploadJustFile}>Upload just file</button>
                </form>
                <hr />
                <form>
                    <h2>Form</h2>
                    <p><b>{this.state.formServiceResponse}</b></p>
                    <div>
                        <input name="firstName" type="text" placeholder="First name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="lastName" type="text" placeholder="Last name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="phoneNumber" type="text" placeholder="Phone number" onChange={this.fieldOnChange} />
                    </div>
                    <input type="file" onChange={this.filesOnChange} />
                    <br />
                    <button type="text" onClick={this.uploadForm}>Upload form </button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <FileUploader />,
    document.getElementById('app-root')
);