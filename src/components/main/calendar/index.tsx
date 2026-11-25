"use client";

import { useTheme } from "@/context/theme-context";
import { isRtl } from "@/i18n/languages";
import type { Locale } from "@/i18n/routing";
import type {
  DateSelectInfo,
  DayCellInfo,
  DayHeaderInfo,
  DayLaneInfo,
  EventClickInfo,
  EventDisplayInfo,
  MoreLinkInfo,
  ToolbarSectionInfo,
} from "@fullcalendar/react";
import FullCalendar, { CalendarRef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import themePlugin from "@fullcalendar/react/themes/classic";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import CalendarEventItem from "./event-item";
import CalendarEventModal from "./event-modal";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "./icons";
import type { CalendarEvent, EventFormData } from "./types";
import CalendarViewSelect from "./view-selector";

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Event Conf.",
    start: new Date().toISOString().split("T")[0],
    extendedProps: { calendar: "Danger" },
  },
  {
    id: "2",
    title: "Meeting",
    start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    extendedProps: { calendar: "Success" },
  },
  {
    id: "3",
    title: "Workshop",
    start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
    extendedProps: { calendar: "Primary" },
  },
];

export default function Calendar() {
  const locale = useLocale();
  const isRtlLayout = isRtl(locale as Locale);
  const { theme } = useTheme();

  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [portalNode, setPortalNode] = useState<Element | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const calendarRef = useRef<CalendarRef>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleViewChange = (viewKey: string) => {
    setCurrentView(viewKey);
    calendarRef.current?.getApi()?.changeView(viewKey);
  };

  const handleOpenAddModal = () => {
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const combineDate = `${yyyy}-${mm}-${dd}`;

    setSelectedEvent(null);
    setSelectedStartDate(combineDate);
    setSelectedEndDate(combineDate);
    setIsEventModalOpen(true);
  };

  const handleDateSelect = (selectInfo: DateSelectInfo) => {
    const startStr = selectInfo.startStr
      ? selectInfo.startStr.split("T")[0]
      : "";
    const endStr = selectInfo.endStr
      ? selectInfo.endStr.split("T")[0]
      : startStr;

    setSelectedEvent(null);
    setSelectedStartDate(startStr);
    setSelectedEndDate(endStr);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickInfo) => {
    const event = clickInfo.event;
    if (event.url) {
      window.open(event.url);
      clickInfo.jsEvent?.preventDefault();
      return;
    }

    const startStr = event.startStr ? event.startStr.split("T")[0] : "";
    const endStr = event.endStr ? event.endStr.split("T")[0] : startStr;

    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      extendedProps: { calendar: event.extendedProps?.calendar || "Primary" },
    });
    setSelectedStartDate(startStr);
    setSelectedEndDate(endStr);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (formData: EventFormData) => {
    const titleVal =
      formData.title.trim() || (selectedEvent ? "Event" : "New Event");
    const startDateVal = formData.start;
    const endDateVal = formData.end || startDateVal;
    const levelVal = formData.level || "Primary";

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          String(ev.id) === String(selectedEvent.id)
            ? {
                ...ev,
                title: titleVal,
                start: startDateVal,
                end: endDateVal || startDateVal,
                extendedProps: { calendar: levelVal },
              }
            : ev,
        ),
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: titleVal,
        start: startDateVal,
        end: endDateVal || startDateVal,
        allDay: true,
        extendedProps: { calendar: levelVal },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsEventModalOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const frameId = requestAnimationFrame(() => {
      const el = calendarContainerRef.current?.querySelector(
        ".ta-toolbar-section:last-child",
      );
      if (el) {
        setPortalNode(el);
      }
    });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isRtlLayout]);

  return (
    <div
      data-columns={12}
      className="em-calendar-frame"
      data-color-scheme={theme}
    >
      <div
        className={`custom-calendar relative ${currentView === "multiMonthYear" ? "fc-multimonth" : ""}`}
        data-color-scheme={theme}
        ref={calendarContainerRef}
      >
        <FullCalendar
          key={isRtlLayout ? "rtl" : "ltr"}
          ref={calendarRef}
          className="gap-0!"
          plugins={[
            themePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            multiMonthPlugin,
          ]}
          initialView="dayGridMonth"
          direction={isRtlLayout ? "rtl" : "ltr"}
          // Toolbar Header configuration
          headerToolbar={{
            start: "prev,next addEventButton",
            center: "title",
            end: "",
          }}
          headerToolbarClass="em-calendar-toolbar"
          toolbarTitleClass="em-calendar-title"
          toolbarSectionClass={(info: ToolbarSectionInfo) => {
            if (info.name === "start") {
              return "ta-toolbar-section ta-toolbar-start order-2 flex w-full items-center justify-between sm:order-1 sm:w-auto sm:justify-start gap-2";
            }
            if (info.name === "center") {
              return "ta-toolbar-section ta-toolbar-center order-1 flex items-center justify-start sm:order-2 sm:justify-center";
            }
            if (info.name === "end") {
              return "ta-toolbar-section ta-toolbar-end order-1 flex items-center justify-end sm:order-3 sm:justify-end";
            }
            return "ta-toolbar-section";
          }}
          buttonGroupClass="gap-2"
          buttons={{
            prev: {
              iconContent: () => (
                <ChevronLeftIcon className="size-5 text-current sm:size-6 rtl:rotate-180" />
              ),
              className:
                "em-button em-button-outline em-control-default em-button-icon",
            },
            next: {
              iconContent: () => (
                <ChevronRightIcon className="size-5 text-current sm:size-6 rtl:rotate-180" />
              ),
              className:
                "em-button em-button-outline em-control-default em-button-icon",
            },
            addEventButton: {
              text: "Add Event +",
              click: () => handleOpenAddModal(),
              className: "em-button em-button-primary em-control-default",
            },
          }}
          // View configurations
          views={{
            multiMonthYear: {
              multiMonthMaxColumns: 3,
              singleMonthClass: "fc-multimonth",
              tableClass:
                "overflow-visible! border-0! sm:border! sm:border-gray-200! dark:sm:border-gray-800! rounded-none! sm:rounded-lg! mt-0! bg-transparent!",
              singleMonthHeaderClass:
                "mb-0! bg-background dark:bg-background sm:bg-transparent! ",
              tableHeaderClass:
                "mb-0! rounded-none! sm:rounded-t-lg! bg-gray-50 dark:bg-background!",
              tableBodyClass: "mt-0!",
              singleMonthMinWidth: 280,
              showNonCurrentDates: true,
              singleMonthHeaderInnerClass:
                "text-sm font-medium! text-foreground dark:text-foreground",
              dayHeaderRowClass: "fc-multimonth-day-header-row",
              dayHeaderClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-border! dark:bg-background/50!"
                  : "border-0! bg-gray-50 py-2! dark:bg-background dark:sm:bg-transparent! first:rounded-none! first:sm:rounded-ss-lg! last:rounded-none! last:sm:rounded-se-lg!",
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "text-sm! font-semibold! text-foreground! dark:text-foreground!"
                  : "py-1 text-xs sm:text-xs font-medium text-gray-400 uppercase",
              dayCellClass: (data: DayCellInfo) => {
                if (data.inPopover) return "bg-transparent! p-3!";
                let cls = "relative! p-0.5 sm:p-1!";
                if (data.isToday)
                  cls +=
                    " isolate rounded-sm! bg-gray-100! dark:bg-background/40! font-semibold text-brand-500 dark:text-brand-400";
                if (data.isOther) cls += " bg-transparent!";
                return cls;
              },
              dayCellInnerClass: (data: DayCellInfo) =>
                data.inPopover
                  ? "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto"
                  : "h-0 max-h-0 overflow-hidden invisible",
              dayCellTopInnerClass:
                "text-xs! sm:text-sm! text-foreground dark:text-foreground",
              dayMaxEvents: 0,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass:
                "absolute! -top-0.5! sm:-top-1! start-0.5! z-10! border-0! bg-transparent! p-0!",
              rowMoreLinkInnerClass: "overflow-visible!",
              moreLinkContent() {
                return (
                  <span>
                    <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                  </span>
                );
              },
            },
            dayGridMonth: {
              dayMaxEvents: isMobile ? 0 : 2,
              dayHeaderAlign: (data: { inPopover: boolean }) =>
                data.inPopover ? "start" : "center",
              dayHeaderClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-border! dark:bg-background/50!"
                  : "border-x-0! border-t border-gray-200! bg-gray-50 dark:border-border! dark:bg-background",
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "text-sm! font-semibold! text-foreground! dark:text-foreground!"
                  : "px-1! py-2! sm:px-3! sm:py-3! md:px-5! md:py-4! text-xs! sm:text-sm! font-medium! text-gray-400 uppercase",
              dayCellClass: (data: DayCellInfo) => {
                if (data.inPopover) return "bg-transparent! p-3!";
                return `bg-transparent! p-1! sm:p-2! ${
                  data.isToday ? "bg-gray-100! dark:bg-background/40!" : ""
                }`;
              },
              dayCellTopInnerClass:
                "text-xs! sm:text-sm! text-foreground dark:text-foreground",
              dayCellInnerClass: (data: DayCellInfo) => {
                if (data.inPopover)
                  return "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto";
                if (isMobile) return "h-0 max-h-0 overflow-hidden invisible";
                return data.isToday ? "rounded-sm!" : "";
              },
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              moreLinkContent(args: MoreLinkInfo) {
                if (isMobile) {
                  return (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  );
                }
                return (
                  <span className="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1 py-0.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100 sm:px-1.5 sm:text-xs dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">
                    +{args.num} more
                  </span>
                );
              },
            },
            timeGridWeek: {
              slotDuration: "01:00:00",
              slotMinHeight: 56,
              allDaySlot: true,
              dayMaxEvents: isMobile ? 0 : undefined,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkContent: isMobile
                ? () => (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  )
                : undefined,
              dayHeaderContent: (arg: DayHeaderInfo) => {
                const weekday = new Intl.DateTimeFormat(locale, {
                  weekday: "short",
                })
                  .format(arg.date)
                  .toUpperCase();
                const day = new Intl.DateTimeFormat(locale, {
                  day: "numeric",
                }).format(arg.date);
                return `${weekday} - ${day}`;
              },
              dayHeaderClass: (data: DayHeaderInfo) =>
                `border-0! bg-gray-50! dark:bg-background! ${
                  data.isToday ? "bg-gray-100/70! dark:bg-background/60!" : ""
                }`,
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                `px-1.5! sm:px-3! py-2.5! sm:py-3.5! text-center! text-xs! sm:text-xs! font-medium! text-muted-foreground! uppercase! dark:text-gray-400! ${
                  data.isToday
                    ? "font-semibold! text-brand-500! dark:text-brand-400!"
                    : ""
                }`,
              slotHeaderDividerClass:
                "border-e! border-s-0! border-y-0! border-gray-200! dark:border-border!",
              slotHeaderClass:
                "px-1.5! sm:px-3! py-1.5! sm:py-2! text-start! text-xs! sm:text-xs! font-medium! text-gray-400! dark:text-muted-foreground!",
              slotLaneClass: "border-gray-100! dark:border-border/60!",
              dayLaneClass: (data: DayLaneInfo) =>
                `border-gray-200! dark:border-border! ${
                  data.isToday
                    ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                    : ""
                }`,
              allDayDividerClass:
                "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-border!",
              allDayHeaderClass:
                "border-0! bg-gray-50! text-xs! sm:text-xs! font-medium! text-muted-foreground! dark:border-0! dark:bg-background! dark:text-gray-400!",
            },
            timeGridDay: {
              slotDuration: "00:30:00",
              slotMinHeight: 48,
              allDaySlot: true,
              dayMaxEvents: isMobile ? 0 : undefined,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkContent: isMobile
                ? () => (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  )
                : undefined,
              dayHeaderContent: (arg: DayHeaderInfo) => {
                const weekday = new Intl.DateTimeFormat(locale, {
                  weekday: "short",
                })
                  .format(arg.date)
                  .toUpperCase();
                const day = new Intl.DateTimeFormat(locale, {
                  day: "numeric",
                }).format(arg.date);
                return `${weekday} - ${day}`;
              },
              dayHeaderClass: (data: DayHeaderInfo) =>
                `border-0! bg-gray-50! dark:bg-background! ${
                  data.isToday ? "bg-gray-100/70! dark:bg-background/60!" : ""
                }`,
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                `px-2! sm:px-4! py-2.5! sm:py-3.5! text-center! text-xs! font-medium! text-muted-foreground! uppercase! dark:text-gray-400! ${
                  data.isToday
                    ? "font-semibold! text-brand-500! dark:text-brand-400!"
                    : ""
                }`,
              slotHeaderDividerClass:
                "border-e! border-s-0! border-y-0! border-gray-200! dark:border-border!",
              slotHeaderClass:
                "px-2! sm:px-3! py-1.5! sm:py-2! text-start! text-xs! sm:text-xs! font-medium! text-gray-400! dark:text-muted-foreground!",
              slotLaneClass: "border-gray-100! dark:border-border/60!",
              dayLaneClass: (data: DayLaneInfo) =>
                `border-gray-200! dark:border-border! ${
                  data.isToday
                    ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                    : ""
                }`,
              allDayDividerClass:
                "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-border!",
              allDayHeaderClass:
                "border-0! bg-gray-50! text-xs! font-medium! text-muted-foreground! dark:border-0! dark:bg-background! dark:text-gray-400!",
            },
          }}
          // Body configuration
          height="auto"
          borderless={true}
          viewClass="border-t! border-b-0! border-x-0! border-gray-200! bg-transparent! dark:border-border! dark:bg-transparent!"
          tableHeaderClass="border-0! bg-gray-50! dark:bg-background!"
          dayHeaderDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-border!"
          slotMinHeight={56}
          slotHeaderDividerClass="border-e! border-s-0! border-y-0! border-gray-200! dark:border-border!"
          allDayDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-border!"
          eventClass="focus:shadow-none"
          nowIndicator={false}
          columnEventClass="bg-transparent! border-0! p-1! shadow-none! hover:shadow-none! focus:outline-none"
          columnEventInnerClass="p-0! border-0! bg-transparent! h-full"
          tableHeaderSticky={true}
          tableClass="overflow-hidden bg-transparent!"
          rowEventClass="bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none"
          rowEventInnerClass="p-0! border-0! bg-transparent!"
          popoverFormat={{ month: "short", day: "numeric", year: "numeric" }}
          popoverClass="em-calendar-popover"
          popoverCloseClass="absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-muted-foreground focus:outline-none dark:text-gray-400 dark:hover:bg-background/5 dark:hover:text-foreground"
          popoverCloseContent={() => <CloseIcon className="size-4" />}
          datesSet={(arg) => {
            setCurrentView(arg.view.type);
            requestAnimationFrame(() => {
              const chunk = calendarContainerRef.current?.querySelector(
                ".ta-toolbar-section:last-child",
              );
              if (chunk) {
                setPortalNode(chunk);
              }
            });
          }}
          selectable={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={(eventInfo: EventDisplayInfo) => (
            <CalendarEventItem eventInfo={eventInfo} />
          )}
        />

        <CalendarViewSelect
          currentView={currentView}
          onViewChange={handleViewChange}
          portalNode={portalNode}
        />
      </div>

      <CalendarEventModal
        open={isEventModalOpen}
        onOpenChange={setIsEventModalOpen}
        selectedEvent={selectedEvent}
        initialStartDate={selectedStartDate}
        initialEndDate={selectedEndDate}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
