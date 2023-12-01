'use client'

import {useState} from "react";
import {FieldValues, SubmitHandler, useForm,} from "react-hook-form";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useRouter} from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLogInModal from "@/app/hooks/useLoginModal";

import Modal from "@/app/components/modals/modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

const LogInModal = () => {
	const registerModal = useRegisterModal();
	const logInModal = useLogInModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	
	const {
		register,
		handleSubmit,
		formState: {
			errors
		}
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	});
	
	const onSubmit : SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		
		signIn("credentials",{
            ...data,
            redirect: false
        }).then((callback) => {
			setIsLoading(false);
			
			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				logInModal.onClose();
			}
			
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	}
	
	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to back"
				subtitle="Login to your account"
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	
	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr/>
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => {}}
			/>
			<div className="
					text-neutral-500
					text-center
					mt-4
					font-light
				"
			>
				<div
					className="
						flex
						justify-center
					 	flex-row
					 	items-center
					 	gap-2
					"
				>
					<div>
						Already have an account?
					</div>
					<div
						onClick={registerModal.onClose}
						className="
							text-neutral-800
							cursor-pointer
							hover:underline
						"
					>
						Log in
					</div>
				</div>
			</div>
		
		</div>
	);
	
	return (
		<Modal
			disabled={isLoading}
			isOpen={logInModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={logInModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}

export default LogInModal;
