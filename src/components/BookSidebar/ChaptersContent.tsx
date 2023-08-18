import styled from "styled-components";
import { Colors } from "../../Colors";
import IBaseChapter from "../../interfaces/service/chapter/IBaseChapter";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import IChapterContentData from "../../interfaces/IChapterContentData";
import Loader from "../Loader/Loader";

export default function ChaptersContent({ data, ...delegated }: IChapterContentData) {
    const params = useParams();

    return (
        <Wrapper {...delegated}>
            <Loader data={{isLoading: data.isLoading}}></Loader>
            {data.baseChapters.map((chapter: IBaseChapter, index) => (
                <ChapterNameWrapper
                    isSelected={data.currentChapterId === chapter._id ? true : false} key={`wrapper_${chapter._id}`}>
                    <ChapterName onClick={() => {
                        if (data.onChapterClick) {
                            data.onChapterClick();
                        }
                    }}
                        to={`/${data.isInWritingMode ? "write" : "read"}/${params.bookId}?chapterId=${chapter._id}`}
                        key={chapter._id}>
                        {chapter.header}
                    </ChapterName>
                    {data.isInWritingMode && <ArrowsWrapper>
                        {(index !== 0) && <ArrowUpIcon onClick={
                            () => {
                                if (data.setOrderId) {
                                    data.setOrderId(chapter.orderId - 1, chapter._id);
                                }
                            }} />}
                        {index !== data.baseChapters.length - 1 && <ArrowDownIcon onClick={
                            () => {
                                if (data.setOrderId) {
                                    data.setOrderId(chapter.orderId + 1, chapter._id)
                                }
                            }} />}
                    </ArrowsWrapper>}
                </ChapterNameWrapper>
            ))}
            {data.baseChapters.length <= 0 && <span>No chapters found</span>}
        </Wrapper>
    );
}

interface ChapterWrapperProps {
    isSelected: boolean;
}

const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowUpIcon = styled(IoIosArrowUp)`
  cursor: pointer;
  @media only screen and (max-width: 650px) {
    font-size: 150%;
  }
`;

const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(180deg);
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`

const ChapterNameWrapper = styled.div<ChapterWrapperProps>`
  text-decoration: none;
  color: ${Colors.TEXT};
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 6px;
  padding: 6px;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? Colors.ACCENT : "")};
`;

const ChapterName = styled(Link)`
  text-decoration: none;
  color: ${Colors.TEXT};
  margin-right: 6px;
  font-size: ${18 / 16}rem;
  display: block;
  text-align: center;
  width: 100%;
`
