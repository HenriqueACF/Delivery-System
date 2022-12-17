import {Address} from "../../types/Address";
import styles from './style.module.css'
import {Icon} from "../Icon";

type Props = {
    color: string
    address: Address
    onSelect: (address: Address) => void
    onEdit:(id: number) => void
    onDelete:(id: number) => void
    menuOpened: number
    setMenuOpened: (id: number) => void
}

export const AddressItem = ({color, address, onSelect, onEdit, onDelete, menuOpened, setMenuOpened}: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.addressArea} onClick={()=> onSelect(address)}>
                <div className={styles.addressIcon}>
                    <Icon icon='location' color={color} width={24} height={24}/>
                </div>
                <div className={styles.addressText}>{`${address.street} - ${address.number}, ${address.neighborhood}  `}</div>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.menuItem} onClick={()=> setMenuOpened(address.id)}>
                    <Icon icon='dots' color={'#6a7d8b'} width={24} height={24}/>
                </div>
                {menuOpened === address.id &&
                    <div className={styles.popup}>
                        <div className={styles.popupItem} onClick={()=> onEdit(address.id)}>
                            <div className={styles.popupIcon}>
                                <Icon
                                    icon='edit'
                                    color={'#96a4ab'}
                                    width={18}
                                    height={18}
                                />
                            </div>
                            <div className={styles.popupText} style={{color}}>Editar</div>
                        </div>
                        <div className={styles.popupItem} onClick={()=> onDelete(address.id)}>
                            <div className={styles.popupIcon}>
                                <Icon
                                    icon='delete'
                                    color={'#96a4ab'}
                                    width={18}
                                    height={18}
                                />
                            </div>
                            <div className={styles.popupText} style={{color}}>Excluir</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}