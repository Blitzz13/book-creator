import ReactModal from "react-modal";
import { OverlayStyle } from "../../commonStyledStyles/OverlayStyle";
import React from "react";
import ICommonModalData from "../../interfaces/modal/ICommonModalData";
import { StyledComponent } from "styled-components";

export default function Modal<ContentStyle, OverlayStyle>({ data, children, id, ...delegate }: ICommonModalData<ContentStyle, OverlayStyle>) {
    let OverlayElement = OverlayStyle as StyledComponent<"div", any, {
        isExiting?: boolean | undefined;
    }, never>;

    ReactModal.setAppElement("#root");

    if (data.OverlayElement) {
        OverlayElement = data.OverlayElement;
    }

    function startExitAnimation() {
        if (!data.isExiting) {
            data.setExiting(true);
        }

        if (data.willPlayCloseAnimation === false) {
            close();
        }
    }

    function close() {
        data.setOpen(false);
        data.setExiting(false);
    }

    return (
        <ReactModal
            id={id}
            className="_"
            overlayClassName="_"
            onRequestClose={startExitAnimation}
            onAfterOpen={() => {
                if (data.onAfterOpen) {
                    data.onAfterOpen();
                }
            }}
            contentElement={(props, children) => (
                <data.ContentElement onAnimationEnd={() => {
                    if (data.isExiting) {
                        close();
                    }
                }} {...data.contentData} {...props}>
                    {children}
                </data.ContentElement>
            )}
            overlayElement={(props, contentElement) => (
                <OverlayElement isExiting={data.isExiting}
                    onAnimationEnd={() => {
                        if (data.isExiting) {
                            close();
                        }
                    }}
                    {...data.overlayData}
                    {...props}>
                    {contentElement}
                </OverlayElement>
            )}
            isOpen={data.isOpen}
            {...delegate}>
            {children}
        </ReactModal>
    );
}