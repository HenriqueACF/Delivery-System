import styles from './styles.module.css'
import {Icon} from "../Icon";


type Props = {
    color: string
    leftIcon?: string
    rightIcon?:string
    value:string
    onClick?:() => void
    fill?: boolean
}
export const ButtonWithIcon = ({color, leftIcon, rightIcon,value,onClick, fill}: Props) => {
    return (
        <div className={styles.container} style={{backgroundColor: fill ? color : '#f9f9fb'}} onClick={onClick}>
            <div className={styles.leftSide} style={{backgroundColor: fill ? 'rgba(0,0,0,.05)' : '#fff'}}>
                {leftIcon &&
                    <Icon
                        color={fill ? '#fff' : color}
                        icon={leftIcon}
                        width={24}
                        height={24}
                    />
                }
            </div>
            
            <div className={styles.center} style={{color: fill ? '#fff' : '#1b1b1b'}}>{value}</div>
            
            <div className={styles.rightSide}>
                {rightIcon &&
                    <Icon
                        color={fill ? '#fff':color}
                        icon={rightIcon}
                        width={24}
                        height={24}
                    />
                }
            </div>
        </div>
    )
}