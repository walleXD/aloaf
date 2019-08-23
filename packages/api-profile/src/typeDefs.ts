import { objectType } from 'nexus'
import { AuthContext } from '@loaf/auth'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileContext extends AuthContext {}

const Profile = objectType({
  name: 'Profile',
  definition: (t): void => {
    // meta
    t.id('id')

    // info
    t.string('username')
    t.string('firstName', { nullable: true })
    t.string('lastName', { nullable: true })
  }
})

export const ProfileTypes = { Profile }
