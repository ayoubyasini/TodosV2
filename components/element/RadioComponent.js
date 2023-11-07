function RadioComponent({status,value, setStatus, children, title}) {
  return (
    <div className={value}>
        <label>
            {children}
            {title}
        </label>
        <input type="radio" id={value} value={value} checked={status === value} onChange={e => setStatus(e.target.value)}/>
    </div>
  )
}

export default RadioComponent