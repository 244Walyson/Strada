import MyPressable from "@/src/components/MyPressable";
<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const colors = {
  white: "#FFFFFF",
  black: "#1A1A1A",
  primaryPink: "#FF758F",
  lightPink: "#FFD1DC",
  darkPink: "#E63950",
  neutralLight: "#F0F2F5",
  primaryBlue: "#003360",
  primaryBlueDarkTheme: "#1E90FF",
  secondaryBlue: "#4D8CFF",
  accentBlue: "#66A3FF",
  softBlue: "#E6F0FF",
  lightGrey: "#F0F0F0",
  grey: "#BDBDBD",
  darkGrey: "#8C8C8C",
};

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAccent: string;
  foreground: string;
  white: string;
  grey: string;
  lightGrey: string;
  darkGrey: string;
}

const lightTheme: Theme = {
  primary: colors.primaryPink,
  secondary: colors.darkPink,
  accent: colors.darkGrey,
  background: colors.white,
  backgroundAccent: colors.lightPink,
  foreground: colors.black,
  white: colors.white,
  grey: colors.grey,
  lightGrey: colors.lightGrey,
  darkGrey: colors.darkGrey,
};

interface Props {
  minDate?: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  startEndDateChange: (startDate: Date | null, endDate: Date | null) => void;
=======
import { lightTheme, Theme } from "@/src/constants/theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  minDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  startEndDateChange: (startData: Date | null, endData: Date | null) => void;
>>>>>>> 7882329 (funcional 1)
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomCalendar: React.FC<Props> = ({
  minDate,
  startDate,
  endDate,
  startEndDateChange,
}) => {
  const [dateList, setDateList] = useState<Date[]>([]);
<<<<<<< HEAD
  const [currentMonthDisplayed, setCurrentMonthDisplayed] = useState(
    new Date()
  );
  const theme = lightTheme;
  const styles = getStyles(theme);

  const isSameDay = (d1: Date | null, d2: Date | null) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const setListOfDate = useCallback((monthDate: Date) => {
    const dates: Date[] = [];
    const firstDayOfMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      1
    );
    const lastDayOfPrevMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      0
    );
    const prevMonthDaysToShow = firstDayOfMonth.getDay();

    for (let i = prevMonthDaysToShow; i > 0; i--) {
      const date = new Date(lastDayOfPrevMonth);
      date.setDate(lastDayOfPrevMonth.getDate() - (i - 1));
      dates.push(date);
    }

    const totalDaysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      dates.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), i));
    }

    let dayCount = dates.length;
    let nextMonthDay = 1;
    while (dayCount < 42) {
      dates.push(
        new Date(
          monthDate.getFullYear(),
          monthDate.getMonth() + 1,
          nextMonthDay
        )
      );
      nextMonthDay++;
      dayCount++;
    }

=======
  const theme = lightTheme;
  const styles = getStyles(theme);

  const currentMonthDate = useRef<Date>(new Date()).current;
  const minimumDate = useRef<Date | null>(minDate).current;
  const maximumDate = useRef<Date | null>(null).current;

  const setListOfDate = useCallback((monthDate: Date) => {
    const dates: Date[] = [];
    const newDate = new Date();
    newDate.setFullYear(monthDate.getFullYear(), monthDate.getMonth(), 0);
    const prevMonthDate = newDate.getDate();
    let previousMonthDay = 0;

    if (newDate.getDay() !== 0) {
      previousMonthDay = newDate.getDay() === 0 ? 7 : newDate.getDay();
      for (let i = 1; i <= previousMonthDay; i++) {
        const date = new Date(newDate);
        date.setDate(prevMonthDate - (previousMonthDay - i));
        dates.push(date);
      }
    }
    // 42 = 7 * 6:- 7 == column, 6 == rows
    for (let i = 0; i < 42 - previousMonthDay; i++) {
      const date = new Date(newDate);
      date.setDate(prevMonthDate + (i + 1));
      dates.push(date);
    }

>>>>>>> 7882329 (funcional 1)
    setDateList(dates);
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    setListOfDate(currentMonthDisplayed);
  }, [currentMonthDisplayed, setListOfDate]);

  const getIsInRange = (date: Date) =>
    startDate && endDate ? date > startDate && date < endDate : false;

  const onDatePressedValidations = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const effectiveMinDate = minDate ? new Date(minDate) : today;
    effectiveMinDate.setHours(0, 0, 0, 0);

    if (date.getTime() < effectiveMinDate.getTime()) return;

    if (!startDate) {
      // No start date selected, set this date as startDate
      startEndDateChange(date, null);
    } else if (!endDate) {
      // Start date is selected, but no end date. Set this date as endDate.
      if (isSameDay(startDate, date)) {
        // If clicking the same date again, reset the selection
        startEndDateChange(startDate, startDate);
      } else if (date < startDate) {
        // If the new date is earlier than startDate, make it the new startDate
        startEndDateChange(date, startDate);
      } else {
        // New date is later than startDate, set it as endDate
        startEndDateChange(startDate, date);
      }
    } else {
      // Both startDate and endDate are selected, start a new selection
      startEndDateChange(date, null);
    }
  };

  const getDaysNameUI = () =>
    WEEK_DAYS.map((day) => (
      <Text key={day} style={styles.weekDayText}>
        {day}
      </Text>
    ));

  const getDaysNoUI = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dateList.map((date, index) => {
      const isDateCurrentMonth =
        date.getMonth() === currentMonthDisplayed.getMonth();
      const isDateStart = isSameDay(date, startDate);
      const isDateEnd = isSameDay(date, endDate);
      const isDateStartOrEnd = isDateStart || isDateEnd;
      const isDateInRange = getIsInRange(date);
      const isToday = isSameDay(date, today);

      const effectiveMinDate = minDate ? new Date(minDate) : today;
      effectiveMinDate.setHours(0, 0, 0, 0);
      const isDisabled = date.getTime() < effectiveMinDate.getTime();

      const applyLeftRadius =
        isDateStart || (isDateInRange && date.getDay() === 0);
      const applyRightRadius =
        isDateEnd || (isDateInRange && date.getDay() === 6);

      return (
        <View key={`day_${index}`} style={styles.dayCell}>
          <View
            style={[
              styles.rangeBackground,
              {
                backgroundColor:
                  isDateStartOrEnd || isDateInRange
                    ? theme.backgroundAccent
                    : "transparent",
                borderBottomLeftRadius: applyLeftRadius ? 24 : 0,
                borderTopLeftRadius: applyLeftRadius ? 24 : 0,
                borderTopRightRadius: applyRightRadius ? 24 : 0,
                borderBottomRightRadius: applyRightRadius ? 24 : 0,
              },
            ]}
          />
          <View
            style={[
              styles.dayNoBtnContainer,
              {
                borderWidth: isDateStartOrEnd ? 2 : 0,
                borderColor: isDateStartOrEnd ? theme.primary : "transparent",
                backgroundColor: isDateStartOrEnd
                  ? theme.primary
                  : "transparent",
              },
              isDateStartOrEnd && styles.activeDatesShadow,
            ]}
          >
            <MyPressable
              style={styles.dayNoBtn}
              android_ripple={{ color: colors.lightPink, borderless: true }}
              onPress={() => onDatePressedValidations(date)}
              disabled={isDisabled}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: isDateStartOrEnd
                    ? "WorkSans-Bold"
                    : "WorkSans-Regular",
                  color: isDateStartOrEnd
                    ? theme.white
                    : isDateCurrentMonth && !isDisabled
                    ? theme.foreground
                    : theme.grey,
                }}
              >
                {date.getDate()}
              </Text>
              {isToday && (
=======
    setListOfDate(new Date());
  }, [setListOfDate]);

  const getIsInRange = (date: Date) => {
    if (startDate != null && endDate != null) {
      return date > startDate && date < endDate;
    } else {
      return false;
    }
  };

  const getIsItStartAndEndDate = (date: Date) => {
    return (
      startDate?.toDateString() === date.toDateString() ||
      endDate?.toDateString() === date.toDateString()
    );
  };

  const isStartDateRadius = (date: Date) => {
    return (
      startDate?.toDateString() === date.toDateString() || date.getDay() === 1
    );
  };

  const isEndDateRadius = (date: Date) => {
    return (
      endDate?.toDateString() === date.toDateString() || date.getDay() === 0
    );
  };

  const onDatePressedValidations = (date: Date) => {
    if (currentMonthDate.getTime() > date.getTime()) return;

    const newMinimumDate = minimumDate ? new Date(minimumDate) : null;
    const newMaximumDate = maximumDate ? new Date(maximumDate) : null;

    if (newMinimumDate) newMinimumDate.setDate(newMinimumDate.getDate());
    if (newMaximumDate) newMaximumDate.setDate(newMaximumDate.getDate() + 1);

    const isWithinRange =
      (!newMinimumDate || date > newMinimumDate) &&
      (!newMaximumDate || date < newMaximumDate);

    if (isWithinRange) {
      handleDateSelection(date);
    }
  };

  const handleDateSelection = (date: Date) => {
    let updatedStartDate = startDate;
    let updatedEndDate = endDate;

    if (!updatedStartDate || (updatedStartDate && updatedEndDate)) {
      // Se não há startDate ou se há um intervalo completo, inicia um novo intervalo
      updatedStartDate = date;
      updatedEndDate = null;
    } else if (updatedStartDate.toDateString() === date.toDateString()) {
      // Se a data clicada for a mesma do startDate, remove a seleção
      updatedStartDate = null;
    } else {
      // Se já há um startDate e a data clicada é diferente, define endDate
      updatedEndDate = date;
    }

    // Garante que startDate seja sempre menor que endDate
    if (
      updatedStartDate &&
      updatedEndDate &&
      updatedEndDate < updatedStartDate
    ) {
      [updatedStartDate, updatedEndDate] = [updatedEndDate, updatedStartDate];
    }

    startEndDateChange(updatedStartDate, updatedEndDate);
  };

  const getDaysNameUI = () => {
    if (dateList.length === 0) {
      return;
    }

    const listUI: React.JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = WEEK_DAYS[dateList[i].getDay()];

      listUI.push(
        <Text key={weekDay} style={styles.weekDayText}>
          {weekDay}
        </Text>
      );
    }
    return listUI;
  };

  const getDaysNoUI = () => {
    const noList: React.JSX.Element[] = [];
    let count = 0;

    for (let i = 0; i < dateList.length / 7; i++) {
      const listUI: React.JSX.Element[] = [];

      for (let j = 0; j < 7; j++) {
        const date = dateList[count];

        const isDateStartOrEnd = getIsItStartAndEndDate(date);
        const isDateInRange = getIsInRange(date);

        listUI.push(
          <View key={`day_${count}`} style={{ flex: 1, aspectRatio: 1.0 }}>
            <View
              style={{
                flex: 1,
                marginVertical: 3,
                backgroundColor: (() => {
                  if (startDate != null && endDate != null) {
                    return isDateStartOrEnd || isDateInRange
                      ? theme.backgroundAccent
                      : "transparent";
                  } else {
                    return "transparent";
                  }
                })(),
                paddingLeft: isStartDateRadius(date) ? 4 : 0,
                paddingRight: isEndDateRadius(date) ? 4 : 0,
                borderBottomLeftRadius: isStartDateRadius(date) ? 24 : 0,
                borderTopLeftRadius: isStartDateRadius(date) ? 24 : 0,
                borderTopRightRadius: isEndDateRadius(date) ? 24 : 0,
                borderBottomRightRadius: isEndDateRadius(date) ? 24 : 0,
              }}
            />
            <View
              style={[
                styles.dayNoBtnContainer,
                {
                  borderWidth: isDateStartOrEnd ? 2 : 0,
                  borderColor: isDateStartOrEnd ? "white" : "transparent",
                  backgroundColor: isDateStartOrEnd
                    ? theme.blue
                    : "transparent",
                },
                isDateStartOrEnd && styles.activeDatesShadow,
              ]}
            >
              <MyPressable
                style={styles.dayNoBtn}
                android_ripple={{ color: "lightgrey", borderless: true }}
                onPress={() => onDatePressedValidations(date)}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: isDateStartOrEnd
                      ? "WorkSans-Bold"
                      : "WorkSans-Regular",
                    color: isDateStartOrEnd
                      ? theme.white
                      : new Date().getTime() < date.getTime()
                      ? theme.foreground
                      : theme.grey,
                  }}
                >
                  {date.getDate()}
                </Text>
>>>>>>> 7882329 (funcional 1)
                <View
                  style={[
                    styles.currentDateIndicator,
                    {
                      backgroundColor:
<<<<<<< HEAD
                        isDateStartOrEnd || isDateInRange
                          ? theme.white
                          : theme.secondary,
                    },
                  ]}
                />
              )}
            </MyPressable>
          </View>
        </View>
      );
    });
  };

  const renderCalendarRows = () => {
    const rows = [];
    const days = getDaysNoUI();
    for (let i = 0; i < days.length; i += 7) {
      rows.push(
        <View key={`row_${i / 7}`} style={styles.dayNoRowView}>
          {days.slice(i, i + 7)}
        </View>
      );
    }
    return rows;
=======
                        new Date().toDateString() === date.toDateString()
                          ? (() => {
                              if (isDateStartOrEnd || isDateInRange) {
                                return "white";
                              } else {
                                return theme.secondary;
                              }
                            })()
                          : "transparent",
                    },
                  ]}
                />
              </MyPressable>
            </View>
          </View>
        );

        count += 1;
      }

      noList.push(
        <View key={`daysRow_${i}`} style={styles.dayNoRowView}>
          {listUI}
        </View>
      );
    }
    return noList;
>>>>>>> 7882329 (funcional 1)
  };

  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <View style={styles.arrowContainerStyle}>
          <MyPressable
            style={styles.arrowBtnStyle}
            touchOpacity={0.6}
            onPress={() => {
<<<<<<< HEAD
              const newMonth = new Date(currentMonthDisplayed);
              newMonth.setMonth(newMonth.getMonth() - 1);
              setCurrentMonthDisplayed(newMonth);
            }}
          >
            <Icon name="keyboard-arrow-left" size={28} />
          </MyPressable>
        </View>
        <View style={styles.monthTextView}>
          <Text style={[styles.monthText]}>
            {MONTH_NAMES[currentMonthDisplayed.getMonth()]}{" "}
            {currentMonthDisplayed.getFullYear()}
          </Text>
        </View>
=======
              currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
              setListOfDate(currentMonthDate);
            }}
          >
            <Icon name="keyboard-arrow-left" size={28} color="grey" />
          </MyPressable>
        </View>
        <Text style={styles.monthHeaderStyle}>
          {MONTH_NAMES[currentMonthDate.getMonth()]}
          {`, ${currentMonthDate.getFullYear()}`}
        </Text>
>>>>>>> 7882329 (funcional 1)
        <View style={styles.arrowContainerStyle}>
          <MyPressable
            style={styles.arrowBtnStyle}
            touchOpacity={0.6}
            onPress={() => {
<<<<<<< HEAD
              const newMonth = new Date(currentMonthDisplayed);
              newMonth.setMonth(newMonth.getMonth() + 1);
              setCurrentMonthDisplayed(newMonth);
            }}
          >
            <Icon name="keyboard-arrow-right" size={28} />
          </MyPressable>
        </View>
      </View>
      <View style={styles.weekDaysRow}>{getDaysNameUI()}</View>
      {renderCalendarRows()}
=======
              currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
              setListOfDate(currentMonthDate);
            }}
          >
            <Icon name="keyboard-arrow-right" size={28} color="grey" />
          </MyPressable>
        </View>
      </View>
      <View style={styles.weekDayContainer}>{getDaysNameUI()}</View>
      <View style={{ paddingHorizontal: 8 }}>{getDaysNoUI()}</View>
>>>>>>> 7882329 (funcional 1)
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    arrowContainerStyle: {
<<<<<<< HEAD
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 48,
    },
    arrowBtnStyle: {
      height: 48,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      borderColor: theme.grey,
      borderWidth: 0.3,
    },
    monthTextView: {
      flex: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    monthText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.foreground,
      fontFamily: "WorkSans-Bold",
    },
    weekDaysRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 4,
    },
    weekDayText: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "WorkSans-SemiBold",
      color: theme.grey,
      flex: 1,
      textAlign: "center",
    },
    dayNoRowView: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 4,
    },
    dayCell: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    rangeBackground: {
      position: "absolute",
      height: 48,
      width: "110%",
      left: "-5%",
      borderRadius: 24,
      zIndex: -1,
    },
    dayNoBtnContainer: {
      height: 44,
      width: 44,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    dayNoBtn: {
      height: 44,
      width: 44,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    activeDatesShadow: {
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 5,
=======
      borderRadius: 24,
      borderWidth: 0.6,
      borderColor: theme.lightGrey,
      overflow: "hidden",
    },
    arrowBtnStyle: {
      height: 38,
      width: 38,
      justifyContent: "center",
      alignItems: "center",
    },
    monthHeaderStyle: {
      flex: 1,
      color: theme.foreground,
      fontSize: 20,
      fontFamily: "WorkSans-Medium",
      textAlign: "center",
      textAlignVertical: "center",
    },
    weekDayContainer: {
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingBottom: 8,
    },
    weekDayText: {
      flex: 1,
      textAlign: "center",
      fontSize: 16,
      fontFamily: "WorkSans-Medium",
      color: theme.accent,
    },
    dayNoRowView: {
      flexDirection: "row",
      marginVertical: 1,
    },
    dayNoBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dayNoBtnContainer: {
      ...StyleSheet.absoluteFillObject,
      padding: 2,
      borderRadius: "50%",
    },
    activeDatesShadow: {
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 2.63,
        },
        android: { elevation: 4 },
      }),
>>>>>>> 7882329 (funcional 1)
    },
    currentDateIndicator: {
      position: "absolute",
      bottom: 6,
<<<<<<< HEAD
      left: "50%",
      transform: [{ translateX: -6 }],
      height: 12,
      width: 12,
      borderRadius: 6,
=======
      height: 4,
      width: 4,
      borderRadius: 2,
>>>>>>> 7882329 (funcional 1)
    },
  });

export default CustomCalendar;
