type Mode = 'active' | 'disabled'

const getString = (isActive: boolean = false): Mode => isActive ? 'active' : 'disabled'

export default getString
