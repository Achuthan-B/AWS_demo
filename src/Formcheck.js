import React from 'react'
import {useState} from "react"

function Formcheck() {
    const [user, setUser] = useState({
        associate_name:'',
        associate_id:'',
        project_id:'',
        location:'',
        skills:[
            {name:'HTML5,CSS3,JS',checked:false},
            {name:'SASS',checked:false},
            {name:'ES5,ES6,ES7',checked:false},
            {name:'Bootstrap 4',checked:false},
            {name:'Angular 8',checked:false},
            {name:'React JS',checked:false},
            {name:'Veu JS',checked:false},
            {name:'TypeScript',checked:false},
            {name:'Express JS',checked:false},
            {name:'Node JS',checked:false},
            {name:'Mongo DB',checked:false},
        ],
        comments:''

    })
//list of sites
    let offshoreLocation=['---select any one---','Chennai','Bangalore','Hyderabad','Pune & Kochi']
    let onshoreLocation=['---select any one---','US','Non US']
    //State of Error
    const [err, setErr] = useState('')
    //State of selected site
    const [selectedSite,setSelectedSite]=useState([])
    //Handle radio
    const handleRadio=(event)=>{
        if(event.target.value=='Offshore'){
            setSelectedSite(offshoreLocation)
        }
        if(event.target.value=='Onshore'){
            setSelectedSite(onshoreLocation)
        }

    }
    //Handle user data
    const handleUserData=(event,index)=>{
       if(event.target.name==='associate_name' && event.target.value!=''){
           setErr({...err,associate_name:''})
       }
       if(event.target.type=='checkbox'){
           let selectedSkills=user.skills
           selectedSkills[index].checked=!selectedSkills[index].checked
           setUser({...user,skills:selectedSkills})
       }
       else{
           setUser({...user,[event.target.name]:event.target.value})
       }
    }

    //Form submit
    const handleFormSubmit=(event)=>{
        event.preventDefault(handleFormSubmit)
        //check with error
        let errors=ValidateUserData(user)
        //check error object is empty or not
        if(Object.keys(errors).length==0){
            console.log(user)
            setErr('')
        }
        else{
            setErr(errors)
        }

    }
    //Validation logic
    const ValidateUserData=(user)=>{
        let errors={}
    //Associate name validation
        //validation for required
        if(!user.associate_name){
            errors.associatenameErr="Please enter the Associate name"
        }
        //validation for min length
        else if(user.associate_name.length<5){
            errors.associatenameErr="Accepts Min 5 - Max 30 Character"
        }
        else if(user.associate_name.length>30){
            errors.associatenameErr="Accepts Min 5 - Max 30 Character"
        }
        else if(user.associate_name.match(/^[a-zA-Z ]*$/)==null){
            errors.associatenameErr="Accepts Alphabets & Space"
        }
    //Associate Id validation
        //validation for required
        if(!user.associate_id){
            errors.associateidErr="Please enter the Associate Id"
        }
        //validation for min & max length
        else if(user.associate_id.length<6){
            errors.associateidErr="Invalid Associate Id"
        }
        else if(user.associate_id.length>6){
            errors.associateidErr="Invalid Associate Id"
        }
        else if(user.associate_id.match(/^[0-9]*$/)==null){
            errors.associateidErr="Invalid Associate Id"
        }
       
    //Project Id validation    
       //validation for required
       if(!user.project_id){
        errors.projectidErr="Please enter the Project Id"
       }
       //validation for min & max length
       else if(user.project_id.length<12){
        errors.projectidErr="Invalid Project Id"
       }
       else if(user.project_id.length>12){
        errors.projectidErr="Invalid Project Id"
       }
       else if(user.project_id.match(/^[a-z0-9]+$/)==null){
        errors.projectidErr="Invalid Project Id"
    }
    // select validation
       //validation for required
       if(!user.location){
           errors.siteErr="Please select the location"
       }
    //checkbox validation
       let selectedSkills=user.skills.filter(skill=>skill.checked===true)
       if(selectedSkills<5){
           errors.checkboxErr="Please select Minimum 5 Skills"
       }  
    // file validation
       //validation for required
       if(!user.files){
           errors.formErr="Please upload Profile Picture"
       }  
    //comments Validation
      //validation for required
      if(!user.comments){
        errors.commentsErr="Please Enter Comments"
       }



        return errors;

    }
   
    return (
        <div className='container'>
            {/* Heading */}
            <h1 className='mb-3 text-center'>Form Validation</h1>
            <form onSubmit={handleFormSubmit} className='w-75 mx-auto'>
            {/* Associate Name */}
            <div className='mb-3'>
                <input type='text' 
                placeholder='Associate Name'
                className='p-2 form-control'
                name='associate_name'
                value={user.associate_name}
                onChange={handleUserData}/>
                {/* error message for Associate name */}
                {err.associatenameErr && <p className='text-danger'>*{err.associatenameErr}</p>}
            </div>
            {/*Associate ID */}
            <div className='mb-3'>
                <input type='text' 
                placeholder='Associate Id'
                className='p-2 form-control'
                name='associate_id'
                value={user.associate_id}
                onChange={handleUserData}/>
                {/* error message for Associate Id */}
                {err.associateidErr && <p className='text-danger'>*{err.associateidErr}</p>}
            </div>
            {/* Project ID */}
            <div className='mb-3'>
                <input type='text' 
                placeholder='Project ID'
                className='p-2 form-control'
                name='project_id'
                value={user.project_id}
                onChange={handleUserData}/>
                {/* error message for Project Id */}
                {err.projectidErr && <p className='text-danger'>*{err.projectidErr}</p>}
            </div>
            {/* site  */}
            {/* Offshore */}
            <div className='form-check form-check-inline mb-3'>
                <input type='radio'
                name='site'
                id='offsite'
                className='form-check-input'
                value='Offshore'
                onChange={handleRadio} />
                <label htmlFor='offsite' className='form-check-label'>Offshore</label>
            </div>
             {/* Onshore */}
             <div className='form-check form-check-inline mb-3'>
                <input type='radio'
                name='site'
                id='onsite'
                className='form-check-input'
                value='Onshore'
                onChange={handleRadio} />
                <label htmlFor='onsite' className='form-check-label'>Onshore</label>
            </div>
            {/* creating select for location */}
            <div className='mb-3'>
                <select name='location' className='form-select' value={user.location} onChange={handleUserData}>
                    {
                        selectedSite.map((site,index)=><option value={site} key={index}>{site}</option>)
                    }
                </select>
                {/* error message for Project Id */}
                {err.siteErr && <p className='text-danger'>*{err.siteErr}</p>}
            </div>
            {/* checkbox for skills */}
            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 mb-3 container'>
                {
                    user.skills.map((skill,index)=><div className='col g-1 form-check' key={index}>
                        <input type='checkbox'
                        name={skill.name}
                        id={skill.name}
                        className='form-check-input'
                        checked={skill.checked}
                        onChange={(event)=>handleUserData(event,index)} />
                        <label htmlFor={skill.name} className='form-check-label'>{skill.name}</label>
                    </div>)
                }
            </div>
            {/* error message for skills */}
            {err.checkboxErr &&<p className='text-danger'>*{err.checkboxErr}</p>}
            {/* upload file */}
            <div className='mb-3'>
                <p>Upload Profile</p>
                <input type='file' name='files'  onChange={handleUserData}/>
            {/* error message for skills */}
            {err.formErr && <p className='text-danger'>*{err.formErr}</p>}
            </div>

            {/* comments */}
            <div className='mb-3'>
                <textarea type='text' 
                placeholder='Comments'
                className='p-2 form-control'
                name='comments'
                value={user.comments}
                onChange={handleUserData}/>
                {/* error message for comments */}
                {err.commentsErr && <p className='text-danger'>*{err.commentsErr}</p>}
            </div>
            {/* Button */}
            <div>
                {/* submit button */}
                <button className='btn btn-primary me-1 p-auto' type='submit'>Submit</button>
                {/* Reset button */}
                <button className='btn btn-danger p-auto' onClick={()=>window.location.reload(false)}>Reset</button>
            </div>
            </form>
        </div>
    )
}

export default Formcheck