import MailSent from './mailSent.svg'
import Card from './creditCard.svg'
import Cupom from './cupom.svg'
import Location from './location.svg'
import Money from './money.svg'
import Check from './success.svg'
import RightArrow from './rightArrow.svg'

type Props = {
    icon: string;
    color: string;
    width: number;
    height: number;
}

export const Icon = ({icon, color, width, height}: Props) => {
    return (
        <div style={{width, height}}>
            {icon === 'mailSent' && <MailSent color={color}/>}
            {icon === 'card' && <Card color={color}/>}
            {icon === 'cupom' && <Cupom color={color}/>}
            {icon === 'location' && <Location color={color}/>}
            {icon === 'money' && <Money color={color}/>}
            {icon === 'checked' && <Check color={color}/>}
            {icon === 'rightArrow' && <RightArrow color={color}/>}
        </div>    
    )
}