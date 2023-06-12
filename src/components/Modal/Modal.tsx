import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import React from "react";
import ICommonModalData from "../../interfaces/modal/ICommonModalData";

export default function Modal<ContentStyle>({ data, children, ...delegate }: ICommonModalData<ContentStyle>) {
    ReactModal.setAppElement("#root");

    function startExitAnimation() {
        if (!data.isExiting) {
            data.setExiting(true);
        }
    }

    function close() {
        data.setOpen(false);
        data.setExiting(false);
    }

    return (
        <ReactModal
            className="_"
            overlayClassName="_"
            onRequestClose={startExitAnimation}
            contentElement={(props, children) => (
                <data.ContentElement onAnimationEnd={() => {
                    if (data.isExiting) {
                        close();
                    }
                }} {...data.contentData} {...props}>{children}</data.ContentElement>
            )}
            overlayElement={(props, contentElement) => (
                <OverlayStyle isExiting={data.isExiting} {...props}>{contentElement}</OverlayStyle>
            )}
            isOpen={data.isOpen}
            {...delegate}>
            {children}
        </ReactModal>
    );
}