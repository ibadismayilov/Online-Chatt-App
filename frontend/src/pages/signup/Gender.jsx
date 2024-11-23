import React from 'react'

const Gender = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <div className='gender-wrapper'>
            <div>
                <label className={`${selectedGender === 'male' ? 'selected' : ''}`}>
                    <span>Male</span>
                    <input type="checkbox" name="" id=""
                        checked={selectedGender === 'male'}
                        onChange={() => onCheckBoxChange('male')} />
                </label>
            </div>
            <div>
                <label className={`${selectedGender === 'female' ? 'selected' : ''}`}>
                    <span>Female</span>
                    <input type="checkbox" name="" id=""
                        checked={selectedGender === 'female'}
                        onChange={() => onCheckBoxChange('female')} />
                </label>
            </div>
        </div>
    )
}

export default Gender