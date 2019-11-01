import Bugfender from '@bugfender/rn-bugfender'

Bugfender.init('NJk1tZ6XqvG7ROz7BCKYlpwIN9uZVnM4')
Bugfender.d('Bugfender', 'Initiated')

export const bugfenderLog = (log, tag = '') => {
  Bugfender.d(tag, log)
}
