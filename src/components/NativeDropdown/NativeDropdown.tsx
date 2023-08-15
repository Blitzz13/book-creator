import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../Colors';

interface INativeDropdown<T> {
  data: {
    items: T[];
  };
  enumType: Record<string, T>;
  width?: number;
  disableFirstOption?: boolean;
  onValueChange: (selectedValue: T) => void;
  initialValue?: T,
}

export default function NativeDropdown<T extends string>({
  data,
  enumType,
  initialValue,
  width,
  disableFirstOption,
  onValueChange,
  ...delegated
}: INativeDropdown<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(data.items[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as T;
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue])

  return (
    <Dropdown
      width={width}
      {...delegated}
      onChange={handleSelectChange}
      value={selectedValue}>
      <Option disabled={disableFirstOption} width={width} value="">
        Choose Option
      </Option>
      {data.items.map((item: T, index) => (
        <Option width={width}
          key={index}
          value={item}>
          {item}
        </Option>
      ))}
    </Dropdown>
  );
}

const Dropdown = styled.select`
  border-radius: 20px;
  border-color: ${Colors.BORDER};
  background-color: ${Colors.ACCENT};
  width: 100%;
  ${({ width }: { width?: number }) => css`
    max-width: ${width || 160}px;
  `}
  font-size: ${16 / 16}rem;
  color: ${Colors.TEXT};
  padding-left: 4px;
`;

const Option = styled.option`
  ${({ width }: { width?: number }) => css`
    width: ${width || 160}px;
    max-width: ${width || 160}px;
  `}
`;
