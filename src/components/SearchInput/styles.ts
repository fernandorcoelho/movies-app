import styled, { css } from 'styled-components';

type StyledInputProps = React.ComponentPropsWithRef<'input'>;

export const Input = styled.input<StyledInputProps>`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 1.1rem;
  display: flex;
  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray.grayBackground};
    color: ${theme.colors.gray.mediumGray};

    ::placeholder {
      color: ${theme.colors.skyBlue};
    }
  `}
`;
