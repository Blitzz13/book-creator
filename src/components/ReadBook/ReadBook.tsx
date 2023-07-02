import styled from "styled-components";
import bookPath from "../../assets/Book.svg"
import { useEffect, useRef, useState } from "react";
import $ from "jquery"
import Editor from "../Editor/Editor";

const initialReadAreaPaddingLeft = 93;
const initialReadAreaPaddingRight = 87;
const initialReadAreaHeightOffset = 48;
const columnGap = 64;

export default function ReadBook(data: any) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [scrollPosX, setScrollPosX] = useState(0);
  const [imageScale, setScale] = useState(0);

  function handleResize(): void {
    const readArea = $("#read-area");
    const bookImage = $("#book-image");
    const textOverlay = $("#text-overlay");
    const navBarHeight = $("#nav-bar").outerHeight();
    const bookImageWidth = bookImage.outerWidth();
    const bookImageHeight = bookImage.outerHeight();

    if (bookImage && textOverlay && navBarHeight && readArea && bookImageWidth && bookImageHeight) {
      const scale = bookImageWidth / 1200;
      setScale(scale);
      textOverlay.outerWidth(bookImageWidth);
      textOverlay.outerHeight(bookImageHeight - (initialReadAreaHeightOffset * scale));
      $(".ql-editor").outerHeight(textOverlay.outerHeight() || 0);
      readArea.css("padding-left", `${initialReadAreaPaddingLeft * scale}px`);
      readArea.css("padding-right", `${initialReadAreaPaddingRight * scale}px`);
      $(".ql-editor").css("column-gap", `${columnGap * scale}px`);
      const textElements = $(".ql-editor").children('p, span, h1, h2, h3, h4, h5, h6, ul, ol, li, div'); // Adjust the selector based on the text elements you want to scale

      textElements.each((index, element: HTMLElement) => {
        const $jqueryElem: JQuery<HTMLElement> = $(element);
        let originalFontSize: number | undefined = $jqueryElem.data('originalFontSize');

        if (originalFontSize === undefined) {
          originalFontSize = parseFloat($jqueryElem.css('font-size') || '0');
          $jqueryElem.data('originalFontSize', originalFontSize); // Save the original font size as a data attribute
        }

        const scaledFontSize: number = originalFontSize * scale;
        $jqueryElem.css('font-size', scaledFontSize + 'px');
      });

      // textElements.each((index, element: HTMLElement) => {
      //   const originalFontSize = parseFloat($(element).css('font-size'));
      //   const scaledFontSize = originalFontSize * scale;
      //   $(element).css('font-size', scaledFontSize + 'px');
      // });

      textOverlay.css("left", `${(bookImage.offset()?.left || 0) - 22.5}px`);
      textOverlay.css("top", `${(bookImage.offset()?.top || 0) - navBarHeight - 9}px`);
    }
  };

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

  useEffect(() => {
    $(".ql-editor").scrollLeft(scrollPosX * imageScale);
  }, [scrollPosX, imageScale]);

  useEffect(() => {
    //make editor split the text into 2 pages
    $(".ql-editor").css("column-count", "2");
    $(".ql-editor").css("column-gap", `${columnGap}px`);
    // var $newElement = $('<p style=height:600px> </p>');
    // $(".ql-editor").append($newElement);
    $(".ql-editor").css("overflow", "hidden");
    //remove background color from the reading area
    $(".ql-container").css("background-color", "transparent");

    handleResize(); // Initial calculation
    $(window).on("resize", handleResize);
    return () => {
      $(window).off("resize", handleResize);
    };
  }, []);

  function nextPage(): void {
    const quill = $(".ql-editor");
    const quilScrollLeft = quill.scrollLeft();
    const quillWidth = quill.outerWidth(true);

    if (quill && quilScrollLeft !== undefined && quillWidth) {
      quill.scrollLeft(quilScrollLeft + quillWidth + (64 / 2));
      setScrollPosX(quilScrollLeft + quillWidth + (64 / 2));
      console.log(`Quill scrolled to ${quill.scrollLeft()}`);
      // const text = getVisibleText(quill.get(0));
      // const element = getVisibleElementWithText(".ql-editor");
      console.log();
    }
    // $(".ql-editor").scrollLeft($(".ql-editor").outerWidth() || 0);
  }

  const text = `{"ops":[{"attributes":{"background":"#ffffff"},"insert":"Morbi tristique ut"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"\\n\\t\\t"},{"attributes":{"underline":true},"insert":"List"},{"insert":"\\nApples"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"Mushrooms"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"Carrots"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"\\n\\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum est a mi ornare, ut finibus ipsum euismod. Proin pharetra magna sit amet massa imperdiet tincidunt. Mauris quis lorem eros. Vestibulum lacinia condimentum augue vel imperdiet. Aliquam quis dapibus eros. Donec facilisis malesuada neque sit amet aliquam. Nam auctor ullamcorper eleifend. Quisque rhoncus augue et tincidunt dictum. Duis mattis bibendum nibh, at pretium tellus tempor at. Nam in semper orci, sed eleifend ipsum."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"\\tEtiam nec mauris sit amet odio placerat condimentum vel eu libero. Integer vitae lectus vitae mi ornare consectetur. Pellentesque feugiat, lectus sit amet finibus rutrum, tortor turpis auctor tellus, et sodales ligula nibh nec quam. Nulla facilisis nisl ac dolor fermentum bibendum. In malesuada risus iaculis rhoncus varius. Suspendisse ac nisi lacinia, elementum orci nec, blandit sem. Mauris mauris magna, pharetra ut leo vitae, semper ultricies dolor. Curabitur felis mauris, vehicula eget mi id, iaculis porta mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In elementum euismod ultricies. Morbi pretium dignissim orci id lacinia. Cras fringilla, justo id viverra consectetur, velit est eleifend velit, vel porta risus metus ac quam. Morbi orci velit, dapibus non lobortis vitae, pretium nec lacus."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"\\t"},{"attributes":{"underline":true},"insert":"Donec sed massa sagittis, consectetur mauris eget, dignissim est. Duis laoreet ex id ante ornare, id vestibulum est maximus. Aliquam accumsan faucibus elit, a euismod arcu fringilla eget. Phasellus ac nulla risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam nec congue lectus, fermentum ultricies diam. Vivamus ac purus mi. Ut cursus enim erat, gravida mollis urna mattis sit amet. Fusce malesuada erat ipsum, ut pretium ipsum vehicula euismod. Sed venenatis tellus nec enim placerat aliquet. Aliquam erat volutpat. Proin varius tortor quis elementum tincidunt."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"\\tNulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam cursus odio sed orci commodo placerat. Nullam volutpat quis diam consequat maximus. Maecenas sit amet sapien risus. Nam est est, imperdiet at pretium non, pulvinar cursus tortor. Suspendisse commodo mi ac odio pellentesque feugiat. Mauris felis nisl, vestibulum id quam non, semper tincidunt turpis. Nam vestibulum tellus erat. In mi ex, commodo ac pretium a, pretium egestas urna. Donec sit amet mattis eros, eu accumsan ipsum. Integer bibendum enim elit, non dignissim purus aliquet nec. Nullam in leo nec libero efficitur gravida. Proin blandit hendrerit dictum. Nunc et augue pellentesque, sodales leo ac, cursus lacus."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Quisque arcu sapien, pulvinar vel facilisis volutpat, eleifend non odio. Maecenas tempus urna ut ante luctus, ut viverra metus euismod. Curabitur placerat gravida libero. Donec ornare nunc et mauris ornare vestibulum. Praesent non pretium magna, ac maximus nisl. Sed quis tortor ac est eleifend ullamcorper. Nunc sagittis varius sapien ac tristique. Suspendisse molestie, est in imperdiet maximus, ipsum mi suscipit sapien, ac finibus risus ipsum non magna. Duis lacus libero, sodales at iaculis sit amet, rhoncus eleifend tellus. Aliquam mattis ultrices odio eu bibendum."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Nunc at nunc non massa porttitor dignissim."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Phasellus at ligula vel dolor ullamcorper scelerisque."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Ut semper ante non euismod fermentum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Ut commodo justo sit amet diam congue, in ornare justo suscipit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"strike":true},"insert":"Morbi cursus arcu eget magna tempor, ac ullamcorper metus vestibulum."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"strike":true},"insert":"Quisque ut orci aliquam, ornare erat id, tempor ligula."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"strike":true},"insert":"Nam egestas nunc a sem dignissim, nec venenatis sapien sagittis."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Donec et nulla id dolor tempor faucibus id efficitur elit."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"In porta odio a luctus sodales."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Donec convallis arcu in mi pellentesque, et euismod metus tempor."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Quisque non ex consectetur, mollis neque at, varius urna."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Quisque sit amet nunc nec neque euismod interdum id et est."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Cras euismod erat eu nulla consequat pulvinar."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sed turpis id risus pellentesque venenatis vitae in ligula."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Nullam et neque a nisi auctor consectetur vel a odio."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n"},{"insert":"Pellentesque feugiat est at arcu ultricies, vitae pretium orci rhoncus."},{"attributes":{"align":"justify","list":"bullet"},"insert":"\\n\\n"},{"insert":"\\tPhasellus eget orci lectus. Sed finibus enim posuere eros pulvinar lobortis. Donec vehicula finibus est eget volutpat. Ut tempus purus ex, ac iaculis urna rutrum sed. Fusce venenatis ex non bibendum mattis. Suspendisse efficitur neque tellus, quis ultrices tellus fringilla ac. Cras enim felis, commodo vel dictum sed, elementum consectetur libero."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Mauris finibus augue ut maximus feugiat. Pellentesque nisl magna, lacinia et quam eu, blandit pellentesque risus. Quisque ultricies consequat purus. Mauris auctor sed tellus finibus consequat. Donec vestibulum arcu nec lorem malesuada, vitae pharetra massa condimentum. Vestibulum cursus est in erat elementum rutrum. Nulla consequat sem enim, ut facilisis mauris bibendum in. Quisque tempor imperdiet vestibulum."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"\\tIn dui nisi, euismod vitae pretium nec, porta non orci. Mauris vel ligula eleifend, suscipit elit et, varius ligula. Morbi sodales ex suscipit, porta est et, dictum nibh. Quisque imperdiet tempor elit nec ornare. Etiam lobortis in leo eu porttitor. Proin consequat lorem ut luctus lobortis. Nam dignissim nec nunc at scelerisque. Suspendisse malesuada, diam at elementum laoreet, mi nulla feugiat odio, dictum suscipit velit lectus pharetra lorem."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"insert":"\\n"}]}`
  return (
    <Wrapper>
      <ImageWrapper>
        <Image id="book-image" src={bookPath} alt="SVG Image" onLoad={handleResize} />
        <TextOverlay id="text-overlay" ref={overlayRef}>
          <ReadArea id="read-area" data={{ setData: text, theme: "bubble", readonly: true }} />
        </TextOverlay>
      </ImageWrapper>
      <SideBar onClick={nextPage}>
        Next page
      </SideBar>
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

  @media only screen and (max-width: 690px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-height: 500px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 977px) {
    display: revert;
  }
`;

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

  @media only screen and (max-width: 977px) {
    display: none;
  }
`

const Image = styled.img`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  @media only screen and (max-width: 880px) {
    /* display: revert; */
    //update image with page image
  }
`

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