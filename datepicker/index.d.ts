interface datepickerOption {
    autoclose?: boolean,
    assumeNearbyYear?: boolean | number,
    calendarWeeks?: boolean,
    clearBtn?: boolean,
    datesDisabled?: string[],
    daysOfWeekDisabled?: string[],
    daysOfWeekHighlighted?: string[],
    defaultViewDate?: string | Date | object
    disableTouchKeyboard?: boolean,
    enableOnReadonly?: boolean,
    endDate?: string | Date
    forceParse?: boolean,
    format?: string
    immediateUpdates?: boolean,
    keepEmptyValues?: boolean,
    keyboardNavigation?: boolean,
    language?: string
    maxViewMode?: string | number
    minViewMode?: string | number
    multidate?: boolean | number
    multidateSeparator?: string
    orientation?: string
    showOnFocus?: boolean,
    startDate?: string | Date
    startView?: string | number
    showWeekDays?: boolean,
    title?: string
    todayBtn?: boolean,
    todayHighlight?: boolean,
    toggleActive?: boolean,
    updateViewDate?: boolean,
    weekStart?: number,
    zIndexOffset?: number
}