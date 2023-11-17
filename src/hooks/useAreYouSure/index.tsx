import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	// Divider,
	IconButton,
	Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import { AreYouSureProps, IAreYouSure, IOnOk } from "./types";

var okFunction: IOnOk = () => {};

const useAreYouSure = (props?: AreYouSureProps): IAreYouSure => {
	const [open, setOpen] = React.useState<boolean>(false);
	const onClose = () => setOpen((o) => !o);
	const [ltitle, setTitle] = React.useState<string | undefined>(props?.title);
	const [content, setContent] = React.useState<React.ReactNode | string>(<></>);

	const contextHolder = (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						width: "95vw",
						maxWidth: "380px",
					},
				}}
			>
				{content && ltitle && (
					<>
						<DialogTitle
							className={"flex flex-row items-center justify-between"}
						>
							<Typography variant={"button"}>{ltitle}</Typography>
							{!props?.hideCancel ? (
								<IconButton
									size="small"
									onClick={onClose}
								>
									<MdClose />
								</IconButton>
							) : (
								<div />
							)}
						</DialogTitle>
						{/* <Divider /> */}
					</>
				)}
				{content && (
					<>
						<DialogContent>{content}</DialogContent>
						{/* <Divider /> */}
					</>
				)}
				<DialogActions>
					<Button
						variant="contained"
						color={props?.color || "primary"}
						onClick={async () => {
							onClose();
							await okFunction();
						}}
					>
						{props?.okText || "Yes"}
					</Button>
					{!props?.hideCancel && (
						<Button
							variant={"outlined"}
							color={props?.color || "primary"}
							onClick={onClose}
						>
							{props?.cancelText || "No"}
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);

	return {
		open: (onOk, content, title) => {
			okFunction = onOk;
			if (content) setContent(content);
			if (title) setTitle(title);
			setOpen(true);
		},
		close: () => setOpen(false),
		contextHolder,
	};
};

export default useAreYouSure;
