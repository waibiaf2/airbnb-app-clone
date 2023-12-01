'use client';
import React, {useCallback, useState} from 'react';

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLogInModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";

interface UserMenuProps {
	currentUser: SafeUser | null
}

// @ts-ignore
const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
	const registerModal = useRegisterModal();
	const logInModal = useLogInModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[]);
	
	const loggedInUserMenuItems = (<>
		<MenuItem
			onClick={() => {}}
			label="My trips"
		/>
		<MenuItem
			onClick={() => {}}
			label="My favourites"
		/>
		<MenuItem
			onClick={() => {}}
			label="My properties"
		/>
		<MenuItem
			onClick={() => {}}
			label="Airbnb my home"
		/>
		<hr/>
		<MenuItem
			onClick={() => signOut()}
			label="Logout"
		/>
	</>);
	
	const notLoggedInUserMenuItems = (<>
		<MenuItem
			onClick={logInModal.onOpen}
			label="Login"
		/>
		<MenuItem
			onClick={registerModal.onOpen}
			label="Signup"
		/>
	</>);
	
	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={() => {}}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"
				>
					Airbnb Your Home
				</div>
				<div
					onClick={toggleOpen}
					className="px-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu/>
					<div className="hidden md:block">
						<Avatar src={currentUser?.image}/>
					</div>
				</div>
				{isOpen &&
					<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
						<div className="flex flex-col cursor-pointer">
							{currentUser ? loggedInUserMenuItems : notLoggedInUserMenuItems}
						</div>
					</div>
				}
			</div>
		</div>
	);
};

export default UserMenu;
