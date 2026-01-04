Directory structure:
└── taro112233-healthcare-sandbox/
    ├── README.md
    ├── components.json
    ├── DESIGN-SYSTEM.md
    ├── eslint.config.mjs
    ├── INSTRUCTIONS.md
    ├── middleware.ts
    ├── next.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── vercel.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   ├── page.tsx
    │   ├── admin/
    │   │   └── page.tsx
    │   ├── api/
    │   │   ├── admin/
    │   │   │   └── stats/
    │   │   │       └── route.ts
    │   │   ├── arcjet/
    │   │   │   └── route.ts
    │   │   ├── auth/
    │   │   │   ├── login/
    │   │   │   │   └── route.ts
    │   │   │   ├── logout/
    │   │   │   │   └── route.ts
    │   │   │   ├── me/
    │   │   │   │   └── route.ts
    │   │   │   └── register/
    │   │   │       └── route.ts
    │   │   ├── dashboard/
    │   │   │   └── route.ts
    │   │   ├── requests/
    │   │   │   ├── route.ts
    │   │   │   ├── [id]/
    │   │   │   │   ├── route.ts
    │   │   │   │   └── comments/
    │   │   │   │       └── route.ts
    │   │   │   └── upload/
    │   │   │       └── route.ts
    │   │   └── security/
    │   │       └── monitoring/
    │   │           └── route.ts
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── register/
    │   │   └── page.tsx
    │   ├── requests/
    │   │   ├── [id]/
    │   │   │   └── page.tsx
    │   │   └── new/
    │   │       └── page.tsx
    │   ├── showcase/
    │   │   └── page.tsx
    │   └── utils/
    │       ├── auth-client.ts
    │       └── auth.tsx
    ├── components/
    │   ├── theme-provider.tsx
    │   ├── theme-toggle.tsx
    │   ├── AdminDashboard/
    │   │   ├── index.tsx
    │   │   ├── RequestTable.tsx
    │   │   └── StatsCards.tsx
    │   ├── RequestDetail/
    │   │   ├── AttachmentList.tsx
    │   │   ├── index.tsx
    │   │   ├── RequestInfo.tsx
    │   │   └── CommentSection/
    │   │       ├── CommentInput.tsx
    │   │       ├── CommentItem.tsx
    │   │       ├── CommentList.tsx
    │   │       └── index.tsx
    │   ├── RequestForm/
    │   │   ├── FileUploadSection.tsx
    │   │   └── index.tsx
    │   ├── RequestList/
    │   │   ├── index.tsx
    │   │   ├── RequestCard.tsx
    │   │   ├── RequestFilters.tsx
    │   │   └── RequestPagination.tsx
    │   ├── RichTextEditor/
    │   │   ├── index.ts
    │   │   ├── MenuBar.tsx
    │   │   ├── RichTextEditor.tsx
    │   │   └── RichTextViewer.tsx
    │   ├── shared/
    │   │   ├── AppHeader.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── LoadingState.tsx
    │   │   ├── StatusBadge.tsx
    │   │   └── TypeBadge.tsx
    │   ├── ShowcaseComponent/
    │   │   ├── index.ts
    │   │   ├── AccordionShowcase/
    │   │   │   └── index.tsx
    │   │   ├── AlertDialogShowcase/
    │   │   │   └── index.tsx
    │   │   ├── AlertShowcase/
    │   │   │   └── index.tsx
    │   │   ├── AspectRatioShowcase/
    │   │   │   └── index.tsx
    │   │   ├── AvatarShowcase/
    │   │   │   └── index.tsx
    │   │   ├── BadgeShowcase/
    │   │   │   └── index.tsx
    │   │   ├── BreadcrumbShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ButtonGroupShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ButtonShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CalendarShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CardShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CarouselShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ChartShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CheckboxShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CollapsibleShowcase/
    │   │   │   └── index.tsx
    │   │   ├── CommandShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ContextMenuShowcase/
    │   │   │   └── index.tsx
    │   │   ├── DialogShowcase/
    │   │   │   └── index.tsx
    │   │   ├── DrawerShowcase/
    │   │   │   └── index.tsx
    │   │   ├── DropdownMenuShowcase/
    │   │   │   └── index.tsx
    │   │   ├── EmptyShowcase/
    │   │   │   └── index.tsx
    │   │   ├── FieldShowcase/
    │   │   │   └── index.tsx
    │   │   ├── FormShowcase/
    │   │   │   └── index.tsx
    │   │   ├── HoverCardShowcase/
    │   │   │   └── index.tsx
    │   │   ├── InputGroupShowcase/
    │   │   │   └── index.tsx
    │   │   ├── InputShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ItemShowcase/
    │   │   │   └── index.tsx
    │   │   ├── KbdShowcase/
    │   │   │   └── index.tsx
    │   │   ├── LabelShowcase/
    │   │   │   └── index.tsx
    │   │   ├── MenubarShowcase/
    │   │   │   └── index.tsx
    │   │   ├── NavigationMenuShowcase/
    │   │   │   └── index.tsx
    │   │   ├── PaginationShowcase/
    │   │   │   └── index.tsx
    │   │   ├── PopoverShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ProgressShowcase/
    │   │   │   └── index.tsx
    │   │   ├── RadioGroupShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ResizableShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ScrollAreaShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SelectShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SeparatorShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SheetShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SkeletonShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SliderShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SpinnerShowcase/
    │   │   │   └── index.tsx
    │   │   ├── SwitchShowcase/
    │   │   │   └── index.tsx
    │   │   ├── TableShowcase/
    │   │   │   └── index.tsx
    │   │   ├── TabsShowcase/
    │   │   │   └── index.tsx
    │   │   ├── TextareaShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ToastShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ToggleGroupShowcase/
    │   │   │   └── index.tsx
    │   │   ├── ToggleShowcase/
    │   │   │   └── index.tsx
    │   │   └── TooltipShowcase/
    │   │       └── index.tsx
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button-group.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── empty.tsx
    │       ├── ExcelExportButton.tsx
    │       ├── field.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-group.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── item.tsx
    │       ├── kbd.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── spinner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       └── tooltip.tsx
    ├── hooks/
    │   ├── use-mobile.ts
    │   ├── use-theme-transition.ts
    │   ├── useComments.ts
    │   ├── useCurrentUser.ts
    │   └── useRequests.ts
    ├── lib/
    │   ├── auth-server.ts
    │   ├── auth.ts
    │   ├── config.ts
    │   ├── file-upload.ts
    │   ├── file-validation.ts
    │   ├── prisma.ts
    │   ├── reserved-routes.ts
    │   ├── rich-text-utils.ts
    │   ├── role-helpers.ts
    │   ├── security-logger.ts
    │   └── utils.ts
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.ts
    │   └── schemas/
    │       ├── attachment.prisma
    │       ├── base.prisma
    │       ├── comment.prisma
    │       ├── request.prisma
    │       └── user.prisma
    ├── scripts/
    │   ├── merge-schemas.js
    │   └── merge-seeds.js
    └── types/
        ├── auth.d.ts
        ├── comment.ts
        ├── cookie.d.ts
        └── request.ts
