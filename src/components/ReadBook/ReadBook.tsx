import styled from "styled-components";
import bookPath from "../../assets/Book.svg"
import pagePath from "../../assets/Page.svg"
import { useEffect, useRef, useState } from "react";
import $ from "jquery"
import Editor from "../Editor/Editor";
import IChapterService from "../../interfaces/service/chapter/IChapterService";

const initialReadAreaPaddingLeft = 92;
const initialReadAreaPaddingRight = 88;
const initialReadAreaHeightOffset = 30;
const columnGap = 64;

export default function ReadBook(data: { chapterService: IChapterService }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [scrollPosX, setScrollPosX] = useState(0);
  const [imageScale, setScale] = useState(0);
  const [text, setText] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [firstVisibileElement, setFirstVisibileElement] = useState<JQuery<HTMLElement>>();

  function handleResize(): void {
    const quill = $(".ql-editor");
    const lastQuillWidth = quill.outerWidth() || 0;
    // console.log("last quill width", quill.outerWidth())
    //make editor split the text into 2 pages
    if (window.innerWidth <= 600) {
      quill.css("column-count", "1");
      // quill.css("padding-right", "0");
    } else {
      quill.css("column-count", "2");
    }

    quill.css("column-gap", `${columnGap}px`);
    // var $newElement = $('<p style=height:600px> </p>');
    // $(".ql-editor").append($newElement);
    //remove background color from the reading area
    quill.css("background-color", "transparent");
    $(".ql-container").css("background-color", "transparent");

    const readArea = $("#read-area");
    const bookImage = $("#book-image");
    const textOverlay = $("#text-overlay");
    const navBarHeight = $("#nav-bar").outerHeight();
    const bookImageWidth = bookImage.outerWidth();
    const bookImageHeight = bookImage.outerHeight();

    if (bookImage && textOverlay && navBarHeight && readArea && bookImageWidth && bookImageHeight) {
      let scale = bookImageWidth / 1200;
      if (window.innerWidth <= 600) {
        scale = 1;
        readArea.css("padding-left", `0`);
        readArea.css("padding-right", `0`);
      } else {
        readArea.css("padding-left", `${initialReadAreaPaddingLeft * scale}px`);
        readArea.css("padding-right", `${initialReadAreaPaddingRight * scale}px`);
      }
      scale = 1;

      setScale(scale);
      // console.log(`scale ${scale}`);
      textOverlay.outerWidth(bookImageWidth);
      textOverlay.outerHeight(bookImageHeight - (initialReadAreaHeightOffset * scale));

      setCssIosPropsForPages(quill);

      const currentWidth = quill.outerWidth() || 0;
      // console.log("current quill width", currentWidth);
      console.log("move quill left by", (quill.scrollLeft() || 0) + (currentWidth - lastQuillWidth) + 34);
      // let pos = quilScrollLeft + quillWidth + ((68 / 2) * imageScale);
      quill.outerHeight(textOverlay.outerHeight() || 0);
      const columnCount = ((quill[0].scrollWidth + 32) / quill[0].clientWidth) * 2
      console.log(columnCount);
      quill.css("column-gap", `${columnGap * scale}px`);
      // const textElements = quill.children('p, span, h1, h2, h3, h4, h5, h6, ul, ol, li, div'); // Adjust the selector based on the text elements you want to scale

      // textElements.each((index, element: HTMLElement) => {
      //   const $jqueryElem: JQuery<HTMLElement> = $(element);
      //   let originalFontSize: number | undefined = $jqueryElem.data('originalFontSize');

      //   if (originalFontSize === undefined) {
      //     originalFontSize = parseFloat($jqueryElem.css('font-size') || '0');
      //     $jqueryElem.data('originalFontSize', originalFontSize); // Save the original font size as a data attribute
      //   }

      //   const scaledFontSize: number = originalFontSize * scale;
      //   $jqueryElem.css('font-size', scaledFontSize + 'px');
      // });

      // textElements.each((index, element: HTMLElement) => {
      //   const originalFontSize = parseFloat($(element).css('font-size'));
      //   const scaledFontSize = originalFontSize * scale;
      //   $(element).css('font-size', scaledFontSize + 'px');
      // });

      textOverlay.css("left", `${(bookImage.offset()?.left || 0) - 22.5}px`);
      textOverlay.css("top", `${(bookImage.offset()?.top || 0) - navBarHeight - 9}px`);
      // quill.scrollLeft((quill.scrollLeft() || 0) - (currentWidth - lastQuillWidth));
      // setScrollPosX((quill.scrollLeft() || 0) + (currentWidth - lastQuillWidth + 0.2));
      // setScrollPosX(firstVisibileElement[0].scroll().off);

      //TODO: Replace with use state
      if ((window as any).recoverElement && (window as any).recoverElement[0] && ((window as any).recoverElement[0].offsetLeft + columnGap / 4) !== quill.scrollLeft()) {
        console.log(firstVisibileElement || undefined);
        // quill[0].sc`ro`llTo({ left: (firstVisibileElement.offset()?.left || 0) + (quill.outerWidth() || 0), behavior: "smooth" })
        // quill[0].scrollTo({ left:  (window as any).recoverElement[0].offsetLeft, behavior: "smooth" })
        // quill[0].scrollTo((window as any).recoverElement[0].offsetLeft - 32, 0)
        quill[0].scrollTo((window as any).recoverElement[0].offsetLeft - (columnGap / 4), 0)
      }

      setWindowWidth(window.innerWidth)

    }
  };

  function getColumnCount(containerSelector: string): number {
    const $container: JQuery<HTMLElement> = $(containerSelector);
    const $childElements: JQuery<HTMLElement> = $container.children();
    const containerWidth: number = $container.width() || 0;

    let totalColumnCount: number = 0;
    let totalWidth: number = 0;

    $childElements.each((index: number, element: HTMLElement) => {
      const $childElement: JQuery<HTMLElement> = $(element);
      const childWidth: number = $childElement.outerWidth(true) || 0;

      if (totalWidth + childWidth > containerWidth) {
        totalColumnCount++;
        totalWidth = 0;
      }

      totalWidth += childWidth;
    });

    if (totalWidth > 0) {
      totalColumnCount++;
    }

    return totalColumnCount;
  }
  function getFirstVisibleElement(container: JQuery<HTMLElement>): JQuery<HTMLElement> {
    const containerOffset = container.scrollLeft() || 0;
    // const containerWidth = container.width() || 0;

    return container.children().filter((index, element) => {
      const elementOffset: number = element.offsetLeft || 0;
      // const elementWidth: number = element.clientWidth || 0;

      // return (elementOffset >= containerOffset && (elementOffset + elementWidth) <= (containerOffset + containerWidth));
      return (elementOffset >= containerOffset);
    }).first();
  }


  // function getVisibleElementWithText(containerSelector: string): HTMLElement | null {
  //   const $container = $(containerSelector);
  //   const $visibleElements = $container.find(':visible').filter(function() {
  //     return $(this).text().trim() !== '';
  //   });

  //   const firstVisibleElement = $visibleElements.first();

  //   if (firstVisibleElement.length > 0) {
  //    return firstVisibleElement;
  //   } else {
  //     // No visible elements found
  //   }

  //   return null;
  // }

  // function isNodeVisible(node: HTMLElement, container: HTMLElement): boolean {
  //   const nodeRect = node.getBoundingClientRect();
  //   const containerRect = container.getBoundingClientRect();

  //   return (
  //     nodeRect.left >= containerRect.left &&
  //     nodeRect.right <= containerRect.right &&
  //     nodeRect.top >= containerRect.top &&
  //     nodeRect.bottom <= containerRect.bottom
  //   );
  // }

  // function traverseTextNodes(node: Node, container: HTMLElement): string {
  //   let visibleText = "";

  //   if (node.nodeType === Node.TEXT_NODE) {
  //     const parentElement = node.parentElement as HTMLElement;
  //     if (isNodeVisible(parentElement, container)) {
  //       return node.textContent?.trim() || "";
  //     }
  //   }

  //   for (let i = 0; i < node.childNodes.length; i++) {
  //     const childText = traverseTextNodes(node.childNodes[i], container);

  //     if (childText) {
  //       visibleText += childText;
  //     }
  //   }

  //   return visibleText;
  // }

  // function getVisibleText(container?: HTMLElement): string {
  //   if (!container) {
  //     return "";
  //   }

  //   return traverseTextNodes(container, container);
  // }

  async function loadText(): Promise<void> {
    const test = (await data.chapterService.fetchChapter("64889370e32e813b76a43650")).content;
    setText(test);
  }

  useEffect(() => {
    const quill = $(".ql-editor");
    quill.scrollLeft(scrollPosX * imageScale);
    const element = getFirstVisibleElement(quill);
    console.log("scroll pos x", quill.scrollLeft());
    firstVisibileElement?.css("background-color", "transparent")
    setFirstVisibileElement(element);
    element.css("background-color", "red");
    //TODO: Replace with use state
    (window as any).recoverElement = element;
  }, [scrollPosX, imageScale]);

  useEffect(() => {
    $(".ql-editor").css("overflow", "hidden");
  }, []);

  window.addEventListener("orientationchange", () => {
    const quill = $(".ql-editor");
    // //make editor split the text into 2 pages
    // if (window.innerWidth <= 600) {
    //   quill.css("column-count", "1");
    //   // quill.css("padding-right", "0");
    // } else {
    //   quill.css("column-count", "2");
    // }

    setCssIosPropsForPages(quill);
    
    //TODO: Replace with use state
    if ((window as any).recoverElement && (window as any).recoverElement[0] && ((window as any).recoverElement[0].offsetLeft + columnGap / 4) !== quill.scrollLeft()) {
      console.log(firstVisibileElement || undefined);
      // quill[0].sc`ro`llTo({ left: (firstVisibileElement.offset()?.left || 0) + (quill.outerWidth() || 0), behavior: "smooth" })
      // quill[0].scrollTo({ left:  (window as any).recoverElement[0].offsetLeft, behavior: "smooth" })
      // quill[0].scrollTo((window as any).recoverElement[0].offsetLeft - 32, 0)
      quill[0].scrollTo((window as any).recoverElement[0].offsetLeft - (columnGap / 4), 0)
    }
    // setWindowWidth(window.innerWidth);
    // console.log(`Window width ${window.innerWidth}`)
  })

  useEffect(() => {
    handleResize(); // Initial calculation
    loadText();

    $(window).on("resize", handleResize);
    return () => {
      $(window).off("resize", handleResize);
    };
  }, []);

  function setCssIosPropsForPages(quill: JQuery<HTMLElement>) {
    if (/iPad|iPhone|iPod/.test(navigator.platform) && window.innerWidth <= 600) {
      quill.css("column-width", `${$("#book-image").outerWidth()}px`);
    } else if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      quill.css("column-width", `revert`);
      quill.css("column-count", "2");
    }
  }

  function changePage(changeForwards: boolean): void {
    const quill = $(".ql-editor");
    const quilScrollLeft = quill.scrollLeft();
    const quillWidth = quill.outerWidth(true);

    if (quill && quilScrollLeft !== undefined && quillWidth) {
      let pos;
      if (changeForwards) {
        pos = quilScrollLeft + quillWidth + ((68 / 2) * imageScale);
      } else {
        pos = quilScrollLeft - quillWidth - ((68 / 2) * imageScale);
      }

      // quill.scrollLeft(pos);
      setScrollPosX(pos);
      // const element = getFirstVisibleElement(quill);
      // setFirstVisibileElement(element);
      // console.log(`Current element ${element.offset()?.left}`)
      // console.log(element[0])
      // console.log(`Quill scrolled to ${pos}`);
      // const text = getVisibleText(quill.get(0));
      // const element = getVisibleElementWithText(".ql-editor");
      // console.log();
    }
    // $(".ql-editor").scrollLeft($(".ql-editor").outerWidth() || 0);
  }

  return (
    <Wrapper>
      <ImageWrapper>
        {(windowWidth > 600) && <Image id="book-image" src={bookPath} alt="SVG Image" onLoad={handleResize} />}
        {(windowWidth <= 600) && <PageImage id="book-image" src={pagePath} alt="SVG Image" onLoad={handleResize} />}


        <TextOverlay id="text-overlay" ref={overlayRef}>
          <ReadArea id="read-area" data={{ setData: text, theme: "bubble", readonly: true }} />
        </TextOverlay>
      </ImageWrapper>
      <SideBar>
        Side bar goes here
      </SideBar>
      <ControlsWrapper>
        <ControlsText onClick={() => changePage(false)}>
          Previous
        </ControlsText>
        <ControlsText onClick={() => changePage(true)}>
          Next
        </ControlsText>
      </ControlsWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 234px;
  /* grid-template-rows: 78px 1fr; */
  grid-template-areas:"a b";

  @media only screen and (max-width: 915px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-height: 500px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    display: revert;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const ControlsText = styled.span`
  cursor: pointer;
`

const Text = styled.p`
  /* max-width: 470px; */
  /* margin-right: 122px;
  margin-left: 86px; */
  left: 30px;
  column-gap: 50px;
  column-count: 2;
`

const SideBar = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;

  @media only screen and (max-width: 915px) {
    display: none;
  }
`

const Image = styled.img`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  @media only screen and (max-width: 600px) {
    /* height: 100svh; */
  }
`;

const PageImage = styled(Image)`
  height: 80svh;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`

// const Page = styled.div`
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(270deg, #D6D4D4 0%, rgba(214, 212, 212, 0.87) 0.01%, #A09696 0.02%, #BFB9B9 14.58%, #FFF 43.75%);
// `

const ImageWrapper = styled.div`
  position: relative;
`

const TextOverlay = styled.div`
  overflow: hidden;
  position: absolute;
  text-align: justify;
`;

const ReadArea = styled(Editor)`
  padding-left: ${initialReadAreaPaddingLeft}px;
  padding-right: ${initialReadAreaPaddingRight}px;
`