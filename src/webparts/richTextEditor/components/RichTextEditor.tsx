import * as React from 'react';
import { IRichTextEditorProps } from './IRichTextEditorProps';
import SunEditor from 'suneditor-react';
require ('suneditor/dist/css/suneditor.min.css');
// import '../styles/suneditor.min.css'
import { ITextFieldStyleProps, ITextFieldStyles,TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack, IStackTokens } from '@fluentui/react';
import './RichTextEditor.module.scss';
import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react';

interface IState {
  text: string;
  standardText: string;
}

export default class RichTextEditor extends React.Component<IRichTextEditorProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
      standardText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStandardText = this.handleStandardText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleChange(content: any) {
    this.setState({ text: content });
    
  }

  handleStandardText(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
    this.setState({ standardText: newValue ?? "" });
  }

  handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const richTextEditorPlainText = this.state.text.replace(/<[^>]+>/g, '');
    const json = JSON.stringify({inputField: this.state.standardText, richTextEditor: this.state.text, richTextEditorPlainText});
    console.log(json)
  }

  public render(): React.ReactElement<IRichTextEditorProps> {
    const stackTokens: IStackTokens = { childrenGap: 30 };
    const stackTokensHorizontal : IStackTokens = { childrenGap: 15, maxWidth: 10 };

    return (
      <form onSubmit={this.handleSubmit}>
      <Stack tokens={stackTokens}>
        <div className='inputFieldText'>
        <TextField label="Standard" styles={getStyles} onChange={this.handleStandardText}/>
        </div>
        <div>
        <SunEditor
          onChange={this.handleChange}
          lang="en"
          width="100%"
          height='auto'
          autoFocus={true}
          setOptions={{
            font: ['"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'],
            defaultStyle: 'font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif; font-size: 14px;',
            minHeight: '200px',
            buttonList: [
              [
                "bold",
                "list",
              ]
            ]
          }}/>
        </div>
        <Stack horizontal tokens={stackTokensHorizontal}>
          <DefaultButton text="Submit" type="submit" style={{"fontSize": "12px"}}/>
          <PrimaryButton text="Export" style={{"fontSize": "12px"}}/>
        </Stack>
      </Stack>
      </form>
    );
  }
}

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [
      required && {
        borderTopColor: props.theme.semanticColors.errorText,
      },
    ],
    subComponentStyles: {
      label: getLabelStyles,
    },
  };
}

function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  const { required } = props;
  return {
    root: required && {
      color: props.theme.palette.themePrimary,
      fontWeight: 400
    },
  };
}
