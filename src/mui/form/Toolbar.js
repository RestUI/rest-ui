import React from 'react';
import { Toolbar as MuiToolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Responsive from '../layout/Responsive';
import { SaveButton, CancelButton } from '../button';

const styles = {
    mobileToolbar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    desktopToolbar: {
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        zIndex: 2,
        padding: '1em',
    },
};

const Toolbar = ({ invalid, basePath }) => (
    <Responsive
        small={
            <MuiToolbar style={styles.mobileToolbar} noGutter>
                <ToolbarGroup>
                    <CancelButton raised={false}  basePath={basePath} />
                    <SaveButton invalid={invalid} raised={false} />
                </ToolbarGroup>
            </MuiToolbar>
        }
        medium={
            <MuiToolbar style={styles.desktopToolbar} >
                <ToolbarGroup>
                    <CancelButton invalid={invalid} basePath={basePath} />
                    <SaveButton invalid={invalid} />
                </ToolbarGroup>
            </MuiToolbar>
        }
    />
);
export default Toolbar;
