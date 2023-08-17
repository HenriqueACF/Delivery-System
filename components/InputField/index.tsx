import { useState } from 'react'
import styles from './styles.module.css'
import Eye from './eye.svg'
import EyeClosed from './eyeClosed.svg'

type Props = {
    color: string
    placeholder: string
    value: string
    onChange: (newValue: string) => void
    password?: boolean
    warning?: boolean
}

export const InputField = ({color, placeholder, value, onChange, password, warning}: Props) =>{
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    return (
        <div 
            className={styles.container}
            style={{
                borderColor: !warning ? (focused ? color:'#f9f9fb') : '#FF0000',
                backgroundColor: focused ? '#fff' : '#f9f9f9'
            }}
            >
            <input
                className={styles.input}
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={()=> setFocused(true)}
                onBlur={()=> setFocused(false)}
            />
            {password &&
                <div 
                    className={styles.showPassword}
                     onClick={toggleShowPassword}   
                >
                    {showPassword && <Eye color="#bbb"/>}
                    {!showPassword && <EyeClosed color="#bbb"/>}
                </div>
            }
        </div>
    )
}