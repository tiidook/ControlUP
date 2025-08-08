import { styled, TextField, Typography } from "@mui/material"

export const MovieInput = styled(TextField)(() => ({
    width: 150,
    '& input': {
        height: '30',
        padding: '10px 14px',
    },
}))

export const SectionTitle = styled(Typography)(() => ({
    fontWeight: 'bold',
    fontSize: 16,
    userSelect: 'none',
}))

export const SectionItem = styled(Typography)<{ clickable?: boolean }>(({ clickable }) => ({
    fontSize: 14,
    userSelect: 'none',
    cursor: clickable ? 'pointer' : 'default',
    padding: 4
}))

export const DataSection = styled('div')(({ theme: { spacing } }) => ({
    padding: spacing(2, 0)
}))

export const Container = styled('div')(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: spacing(2, 10),
}))
