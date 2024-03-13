
import { useContext } from 'react'
import ReactSwitch from 'react-switch'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import ProfileNavLinkComponents from './ProfileNavLinkComponents'
import { IProfileAsideOptions } from '../../../types/types';

function ProfileAsideOptions({ CustomComponent }: IProfileAsideOptions) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <aside className='flex-col rounded-md p-3 md:bg-color-secondaryTabs h-full ' style={{
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
        }}>
            <ProfileNavLinkComponents title={"Personal Information"} href={"/profile/information"} />
            <ProfileNavLinkComponents title={"Change password"} href={"/profile/changepassword"} />
            <ProfileNavLinkComponents title={"My Orders"} href={"/profile/orders"} />
            <ProfileNavLinkComponents title={"My Wishlist"} href={"/profile/wishlist"} />
            <ProfileNavLinkComponents title={"My Reviews"} href={"/profile/reviews"} />

            <div className={`${CustomComponent ? "my-2" : ""}`}>
                {CustomComponent && <CustomComponent isHidden={false} isCentered={true}
                    customClasses='flex w-full justify-center py-2 gap-x-2' />}
            </div>
            <ReactSwitch handleDiameter={25} width={45}
                height={20} checked={theme == "dark"} onChange={toggleTheme} />
        </aside>
    )
}

export default ProfileAsideOptions