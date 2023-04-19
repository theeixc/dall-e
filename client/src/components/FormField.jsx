import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isRandomPrompt, handleClickRandomPrompt }) => {
  return (
    <div>
      {/* 对表单项的包装 */}
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-600'>
          {labelName}
        </label>

        {/* 是否有随机 Prompt 按钮 */}
        {isRandomPrompt && (
          <button
            type='button'
            onClick={handleClickRandomPrompt}
            className='font-semibold text-xs bg-[#ECECF1] py-2 px-4 rounded-[5px] text-black'
          >
            生成随机Prompt
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      />
    </div>
  )
}

export default FormField