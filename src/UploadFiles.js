import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef
} from "react";
import FileUploadService from "./fileUploadService";
import './UploadFiles.css';
// import UploadFiles from './UploadFiles';

const UploadFiles = forwardRef((props, ref) => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [message, setMessage] = useState("");

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };
    
    useImperativeHandle(ref, () => ({
        upload: () => {
            return new Promise((resolve, reject) => {

                if (selectedFiles) {

                    FileUploadService.upload(selectedFiles)
                        .then((response) => {
                            setMessage(response.data.message);
                            resolve(response.data.files);
                            //return UploadService.getFiles();
                        })
                        .catch((err) => {

                            fileInput.current.value = '';
                            setSelectedFiles(undefined);
                            if (err.response.data.message) {
                                setMessage(err.response.data.message);
                            } else {
                                setMessage("Could not upload the file!");
                            }
                            reject();
                        });
                } else {

                    resolve([]);
                }


            })
        }
    }));

    const fileInput = useRef();

    return (    
    <div className="form-group">
        <label for="file">사진업로드</label>
        <input type="file" accept="image/*" onChange={selectFile} ref={fileInput} multiple/>   

        <div className="alert alert-light" role="alert" style={{color:'red'}}>
            {message}
        </div>
    </div>
    )

});

export default UploadFiles;

// import React from 'react';
// import axios from 'axios';

// class uploadFiles extends React.Component {
//     state = { selectedFiles: null };
//     onClickHandler = event => {
//       const formData = new FormData();
//       formData.append(
//         "uploadImages",
//         this.state.selectedFiles,
//         this.state.selectedFiles.name
//       );
//       const config = {
//         headers: {
//           "content-type": "multipart/form-data"
//         }
//       };
//       axios.post(`uploadAPI`, formData, config);
//     };
//     fileChangedHandler = event => {
//       const files = event.target.files;
//       this.setState({
//         selectedFiles: files
//       });
//     };
//     render() {
//       return (
//         <div className="uploadFiles" style={{ marginTop: "100px" }}>
//           <input type="file" multiple onChange={this.fileChangedHandler} />
//           <button onClick={this.onClickHandler}>저장하기</button>
//         </div>
//       );
//     }
//   }
  
//   export default uploadFiles;